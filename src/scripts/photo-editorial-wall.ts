class EditorialPhotoWall extends HTMLElement {
  private cleanup?: () => void;

  connectedCallback() {
    if (this.cleanup) return;

    const buttons = Array.from(this.querySelectorAll<HTMLButtonElement>('[data-wall-layout]'));
    const status = this.querySelector<HTMLElement>('[data-wall-status]');
    const controller = new AbortController();

    const setLayout = (layout: 'random' | 'linear') => {
      this.dataset.layout = layout;
      buttons.forEach((button) => {
        const active = button.dataset.wallLayout === layout;
        button.setAttribute('aria-pressed', String(active));
      });
      if (status) status.textContent = layout === 'random' ? '当前为随机编排' : '当前为线性编排';
    };

    buttons.forEach((button) => {
      button.addEventListener('click', () => {
        setLayout(button.dataset.wallLayout === 'linear' ? 'linear' : 'random');
      }, { signal: controller.signal });
    });

    setLayout(this.dataset.layout === 'linear' ? 'linear' : 'random');
    this.cleanup = () => {
      controller.abort();
      this.cleanup = undefined;
    };
    document.addEventListener('astro:before-swap', () => this.cleanup?.(), { once: true, signal: controller.signal });
  }

  disconnectedCallback() { this.cleanup?.(); }
}

if (!customElements.get('editorial-photo-wall')) {
  customElements.define('editorial-photo-wall', EditorialPhotoWall);
}
