type Transition = 'fade' | 'vertical-slide' | 'horizontal-reveal' | 'horizontal-slide' | 'horizontal-scroll' | 'grid-slide';

class AlbumViewer extends HTMLElement {
  private cleanup?: () => void;

  connectedCallback() {
    if (this.cleanup) return;
    const surface = this.querySelector<HTMLElement>('.photo-viewer')!;
    const dialog = surface instanceof HTMLDialogElement ? surface : null;
    const stage = this.querySelector<HTMLElement>('.photo-viewer__stage')!;
    const slides = Array.from(this.querySelectorAll<HTMLElement>('[data-slide]'));
    const thumbnails = Array.from(this.querySelectorAll<HTMLButtonElement>('[data-thumbnail]'));
    const counter = this.querySelector<HTMLElement>('[data-counter]')!;
    const caption = this.querySelector<HTMLElement>('[data-caption]')!;
    if (!slides.length) return;

    const controller = new AbortController();
    const { signal } = controller;
    let current = 0;
    let effect = this.dataset.transition as Transition;
    let animations: Animation[] = [];
    let busy = false;
    let revision = 0;
    let opener: HTMLElement | null = null;
    let oldOverflow: string | null = null;
    let pointer: { x: number; y: number; id: number } | null = null;
    let scrollTimer: ReturnType<typeof setTimeout> | undefined;
    let programmaticScrollUntil = 0;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    const restoreScroll = () => {
      if (oldOverflow !== null) document.body.style.overflow = oldOverflow;
      oldOverflow = null;
    };
    const updateStatus = () => {
      counter.textContent = `${String(current + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`;
      caption.textContent = slides[current].querySelector('img')!.alt;
      thumbnails.forEach((thumb, index) => {
        if (index === current) thumb.setAttribute('aria-current', 'true');
        else thumb.removeAttribute('aria-current');
      });
      const thumb = thumbnails[current];
      const strip = thumb.parentElement!;
      strip.scrollTo({ left: thumb.offsetLeft - strip.offsetLeft - strip.clientWidth / 2 + thumb.clientWidth / 2, behavior: 'instant' });
      // Load only the current picture and its neighbors ahead of navigation.
      [current, (current + 1) % slides.length, (current - 1 + slides.length) % slides.length].forEach(index => {
        slides[index].querySelector('img')!.loading = 'eager';
      });
    };
    const settle = () => {
      revision++;
      animations.forEach(animation => animation.cancel());
      animations = [];
      busy = false;
      slides.forEach((slide, index) => {
        slide.hidden = effect !== 'horizontal-scroll' && index !== current;
        slide.style.zIndex = '';
      });
    };
    const scrollToCurrent = (smooth: boolean) => {
      clearTimeout(scrollTimer);
      programmaticScrollUntil = performance.now() + (smooth ? 900 : 150);
      stage.scrollTo({ left: slides[current].offsetLeft - (stage.clientWidth - slides[current].clientWidth) / 2, behavior: smooth && !reducedMotion.matches ? 'smooth' : 'instant' });
    };
    const sizeScrollStrip = () => {
      const widths = slides.map(slide => {
        const img = slide.querySelector('img')!;
        const ratio = img.naturalWidth && img.naturalHeight ? img.naturalWidth / img.naturalHeight : Number(img.getAttribute('width') || 3) / Number(img.getAttribute('height') || 4);
        const width = Math.min(stage.clientHeight * ratio, stage.clientWidth * .9);
        slide.style.setProperty('--scroll-width', `${width}px`);
        return width;
      });
      stage.style.setProperty('--scroll-start', `${Math.max(0, (stage.clientWidth - widths[0]) / 2 - 16)}px`);
      stage.style.setProperty('--scroll-end', `${Math.max(0, (stage.clientWidth - widths[widths.length - 1]) / 2 - 16)}px`);
    };
    const applyEffect = () => {
      clearTimeout(scrollTimer);
      settle();
      stage.toggleAttribute('data-scroll', effect === 'horizontal-scroll');
      if (effect === 'horizontal-scroll') { sizeScrollStrip(); scrollToCurrent(false); }
      else stage.scrollLeft = 0;
    };
    const show = (index: number, direction = index >= current ? 1 : -1, animate = true) => {
      const next = (index + slides.length) % slides.length;
      if (busy && animate) return;
      if (next === current && animate) return;
      const outgoing = slides[current];
      current = next;
      updateStatus();
      if (effect === 'horizontal-scroll') {
        scrollToCurrent(animate);
        return;
      }
      settle();
      if (!animate || reducedMotion.matches) return;
      const incoming = slides[current];
      outgoing.hidden = false;
      incoming.hidden = false;
      incoming.style.zIndex = '2';
      outgoing.style.zIndex = '1';
      const distance = direction * 100;
      let enter: Keyframe[];
      let leave: Keyframe[];
      switch (effect) {
        case 'vertical-slide':
          enter = [{ transform: `translateY(${distance}%)` }, { transform: 'translateY(0)' }];
          leave = [{ transform: 'translateY(0)' }, { transform: `translateY(${-distance}%)` }];
          break;
        case 'horizontal-slide':
          enter = [{ transform: `translateX(${distance}%)` }, { transform: 'translateX(0)' }];
          leave = [{ transform: 'translateX(0)' }, { transform: `translateX(${-distance}%)` }];
          break;
        case 'horizontal-reveal':
          enter = [{ clipPath: direction > 0 ? 'inset(0 0 0 100%)' : 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0 0 0)' }];
          leave = [{ transform: 'scale(1)', opacity: 1 }, { transform: 'scale(.96)', opacity: .4 }];
          break;
        case 'grid-slide':
          enter = [{ transform: `translate(${direction * 35}%, 25%) scale(.38)`, opacity: 0 }, { transform: 'translate(0, 0) scale(1)', opacity: 1 }];
          leave = [{ transform: 'scale(1)', opacity: 1 }, { transform: `translate(${-direction * 35}%, -25%) scale(.38)`, opacity: 0 }];
          break;
        default:
          enter = [{ opacity: 0 }, { opacity: 1 }];
          leave = [{ opacity: 1 }, { opacity: 0 }];
      }
      busy = true;
      const token = revision;
      const options: KeyframeAnimationOptions = { duration: 520, easing: 'cubic-bezier(.22,.68,.2,1)', fill: 'both' };
      animations = [incoming.animate(enter, options), outgoing.animate(leave, options)];
      Promise.all(animations.map(animation => animation.finished)).then(() => {
        if (token === revision) settle();
      }).catch(() => { /* Cancellation is expected when closing or changing effects. */ });
    };

    this.closest('.photo-presentation')?.querySelectorAll<HTMLElement>('[data-photo-open]').forEach(tile => {
      tile.addEventListener('click', () => {
        if (!dialog) return;
        opener = tile;
        show(Number(tile.dataset.photoOpen), 1, false);
        oldOverflow = document.body.style.overflow;
        dialog.showModal();
        document.body.style.overflow = 'hidden';
        if (!reducedMotion.matches) {
          const from = tile.getBoundingClientRect();
          const to = stage.getBoundingClientRect();
          stage.animate([
            { opacity: 0, transform: `translate(${from.x + from.width / 2 - to.x - to.width / 2}px, ${from.y + from.height / 2 - to.y - to.height / 2}px) scale(.3)` },
            { opacity: 1, transform: 'translate(0, 0) scale(1)' },
          ], { duration: 360, easing: 'cubic-bezier(.2,.7,.2,1)' });
        }
      }, { signal });
    });
    this.querySelector('[data-close]')?.addEventListener('click', () => dialog?.close(), { signal });
    dialog?.addEventListener('close', () => {
      settle();
      restoreScroll();
      opener?.focus({ preventScroll: true });
    }, { signal });
    dialog?.addEventListener('click', event => {
      if (event.target === dialog) dialog.close();
    }, { signal });
    this.querySelector('[data-previous]')?.addEventListener('click', () => show(current - 1, -1), { signal });
    this.querySelector('[data-next]')?.addEventListener('click', () => show(current + 1, 1), { signal });
    thumbnails.forEach((thumb, index) => thumb.addEventListener('click', () => show(index), { signal }));
    this.querySelector('select')?.addEventListener('change', event => {
      effect = (event.target as HTMLSelectElement).value as Transition;
      applyEffect();
    }, { signal });
    surface.addEventListener('keydown', event => {
      if ((event.target as HTMLElement).matches('select, input, textarea') || event.altKey || event.ctrlKey || event.metaKey) return;
      const keys: Record<string, number> = { ArrowLeft: current - 1, ArrowRight: current + 1, Home: 0, End: slides.length - 1 };
      if (effect === 'vertical-slide') { keys.ArrowUp = current - 1; keys.ArrowDown = current + 1; }
      if (event.key in keys) {
        event.preventDefault();
        show(keys[event.key], event.key === 'ArrowLeft' || event.key === 'ArrowUp' ? -1 : 1);
      }
    }, { signal });
    stage.addEventListener('pointerdown', event => {
      programmaticScrollUntil = 0;
      if (effect === 'horizontal-scroll' || !event.isPrimary || event.button !== 0) return;
      pointer = { x: event.clientX, y: event.clientY, id: event.pointerId };
      stage.setPointerCapture(event.pointerId);
    }, { signal });
    stage.addEventListener('pointerup', event => {
      if (!pointer || pointer.id !== event.pointerId) return;
      const dx = event.clientX - pointer.x;
      const dy = event.clientY - pointer.y;
      pointer = null;
      if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) show(current + (dx < 0 ? 1 : -1), dx < 0 ? 1 : -1);
    }, { signal });
    stage.addEventListener('pointercancel', () => { pointer = null; }, { signal });
    stage.addEventListener('wheel', () => { programmaticScrollUntil = 0; }, { signal, passive: true });
    stage.addEventListener('scroll', () => {
      if (effect !== 'horizontal-scroll' || performance.now() < programmaticScrollUntil) return;
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        if (effect !== 'horizontal-scroll') return;
        const center = stage.scrollLeft + stage.clientWidth / 2;
        current = slides.reduce((best, slide, index) => (
          Math.abs(slide.offsetLeft + slide.clientWidth / 2 - center) < Math.abs(slides[best].offsetLeft + slides[best].clientWidth / 2 - center) ? index : best
        ), 0);
        updateStatus();
      }, 100);
    }, { signal, passive: true });
    const resize = new ResizeObserver(() => {
      if (effect === 'horizontal-scroll') { sizeScrollStrip(); scrollToCurrent(false); }
    });
    resize.observe(stage);
    slides.forEach(slide => {
      const img = slide.querySelector('img')!;
      const error = slide.querySelector<HTMLElement>('.photo-viewer__error')!;
      img.addEventListener('error', () => { error.hidden = false; }, { signal });
      img.addEventListener('load', () => {
        error.hidden = true;
        if (effect === 'horizontal-scroll') { sizeScrollStrip(); scrollToCurrent(false); }
      }, { signal });
      if (img.complete && !img.naturalWidth) error.hidden = false;
    });
    this.cleanup = () => {
      controller.abort();
      resize.disconnect();
      clearTimeout(scrollTimer);
      settle();
      restoreScroll();
      this.cleanup = undefined;
    };
    document.addEventListener('astro:before-swap', () => this.cleanup?.(), { once: true, signal });
    applyEffect();
    if (!dialog) updateStatus();
  }

  disconnectedCallback() { this.cleanup?.(); }
}

if (!customElements.get('album-viewer')) customElements.define('album-viewer', AlbumViewer);
