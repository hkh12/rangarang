/* eslint-disable no-restricted-globals, no-console */
import rangarang, { getDataFromCanvas } from '../../dist/index.modern.js';

window.onload = () => {
  const filename = new URLSearchParams(location.search).get('i');
  const { body } = document;
  if (filename) {
    const image = new Image();
    image.src = `images/${filename}`;
    body.prepend(image);
    image.onload = () => {
      const data = getDataFromCanvas(image);
      const startTime = Date.now();
      const { text, background } = rangarang(data);
      const duration = Date.now() - startTime;
      body.style.backgroundColor = background;
      body.style.color = text;
      document.title = `${text} on ${background}`;
      document.querySelector('meta[name=theme-color]').content = background;
      body.insertAdjacentHTML('beforeend', `
        <h1>${filename}</h1>
        <p>Generated in <b>${duration}ms</b> (~${(data.length / 4 / duration).toFixed(2)} pixels per ms)</p>
      `);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          image.classList.add('active');
        });
      });
    };
  } else {
    body.insertAdjacentHTML('beforeend', `
      <span>
        Add a picture to <b>/examples/web</b>,
        and use the <b>?i=&lt;file-name&gt;</b> query string.
      </span>
    `);
  }
};
