import Fuse from 'fuse.js';

interface SearchItem {
  title: string;
  description?: string;
  pubDate: string;
  image?: string;
  url: string;
  content: string;
}

export async function initSearch() {
  const searchOpenIcon = document.querySelector('.icon__search');
  const searchCloseIcon = document.querySelector('.search__close');
  const searchInput = document.getElementById('js-search-input') as HTMLInputElement | null;
  const resultsContainer = document.getElementById('js-results-container');
  const searchOverlay = document.querySelector('.search');

  if (!searchInput || !resultsContainer) return;

  searchOpenIcon?.addEventListener('click', () => {
    searchOverlay?.classList.add('is-visible');
    setTimeout(() => searchInput.focus(), 300);
  });

  searchCloseIcon?.addEventListener('click', () => {
    searchOverlay?.classList.remove('is-visible');
    searchInput.value = '';
    resultsContainer.innerHTML = '';
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      searchOverlay?.classList.remove('is-visible');
      searchInput.value = '';
      resultsContainer.innerHTML = '';
    }
  });

  const response = await fetch('/search.json');
  const searchData: SearchItem[] = await response.json();

  const fuse = new Fuse(searchData, {
    keys: [
      { name: 'title', weight: 1.0 },
      { name: 'description', weight: 0.5 },
      { name: 'content', weight: 0.2 },
    ],
    threshold: 0.15,
    ignoreLocation: true,
  });

  searchInput.addEventListener('input', () => {
    const results = fuse.search(searchInput.value);
    resultsContainer.innerHTML = '';

    if (results.length === 0 && searchInput.value) {
      resultsContainer.innerHTML = '<h3 class="no-results">No results found</h3>';
      return;
    }

    results.slice(0, 9).forEach(({ item }) => {
      const date = new Date(item.pubDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });

      resultsContainer.innerHTML += `
        <div class="article col col-4 col-d-6 col-t-12 animate">
          <div class="article__inner">
            <div class="article__head">
              <div class="article__date">
                <time datetime="${item.pubDate}">${date}</time>
              </div>
              ${item.image ? `
                <a class="article__image" href="${item.url}">
                  <img loading="lazy" src="${item.image}" alt="${item.title}">
                </a>
              ` : ''}
            </div>
            <div class="article__content">
              <h2 class="article__title">
                <a href="${item.url}">${item.title}</a>
              </h2>
              <p class="article__excerpt">${item.description || ''}</p>
            </div>
          </div>
        </div>
      `;
    });
  });
}
