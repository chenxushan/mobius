export function initCopyCode() {
  const codeBlocks = document.querySelectorAll<HTMLElement>('.post__content pre, .page__content pre');

  codeBlocks.forEach((pre) => {
    if (pre.querySelector('.copy-code-button')) return;

    const button = document.createElement('button');
    const copyText = 'Copy';
    button.type = 'button';
    button.className = 'copy-code-button';
    button.ariaLabel = 'Copy code to clipboard';
    button.innerText = copyText;

    button.addEventListener('click', async () => {
      const code = pre.querySelector('code')?.innerText.trimEnd() || '';
      try {
        await navigator.clipboard.writeText(code);
        button.innerText = 'Copied!';
        setTimeout(() => {
          button.blur();
          button.innerText = copyText;
        }, 2000);
      } catch (err) {
        console.error('Copy failed', err);
      }
    });

    pre.style.position = 'relative';
    pre.appendChild(button);
  });
}
