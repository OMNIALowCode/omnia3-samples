const css = `
#app {
  display: flex;
  flex-direction: column;
  height: 95vh;
}
#toolbar {
  display: flex;
  align-items: center;
  background-color: #555;
  color: #fff;
  padding: 0.5em;
}
#toolbar button,
#page-mode input {
  color: currentColor;
  background-color: transparent;
  font: inherit;
  border: 1px solid currentColor;
  border-radius: 3px;
  padding: 0.25em 0.5em;
}
#toolbar button:hover,
#toolbar button:focus,
#page-mode input:hover,
#page-mode input:focus {
  color: lightGreen;
}
#page-mode {
  display: flex;
  align-items: center;
  padding: 0.25em 0.5em;
}

#viewport-container {
  flex: 1;
  background: #eee;
  overflow: auto;
}
#viewport {
  width: 90%;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}
#viewport > div {
  text-align: center;
  max-width: 100%;
}
#viewport canvas {
  width: 100%;
  box-shadow: 0 2px 5px gray;
}
`;

class OMNIAPDFViewerElement extends HTMLElement {
  constructor() {
    super();

    this.pdfjsLib = null;
    this.currentPageIndex = 0;
    this.pageMode = 1;
    this.cursorIndex = Math.floor(this.currentPageIndex / this.pageMode);
    this.pdfInstance = null;
    this.totalPagesCount = 0;
    this.loadFinish = false;
    this.pdfURL = null;

    this.styleElement = document.createElement('style');
    this.styleElement.innerHTML = css;

    this.render = () => {
      this.cursorIndex = Math.floor(this.currentPageIndex / this.pageMode);
      const startPageIndex = this.cursorIndex * this.pageMode;
      const endPageIndex =
        startPageIndex + this.pageMode < this.totalPagesCount ? startPageIndex + this.pageMode - 1 : this.totalPagesCount - 1;
  
      const renderPagesPromises = [];
      for (let i = startPageIndex; i <= endPageIndex; i++) {
        renderPagesPromises.push(this.pdfInstance.getPage(i + 1));
      }
  
      Promise.all(renderPagesPromises).then((pages) => {
        const pagesHTML = `<div style="width: ${this.pageMode > 1 ? '50%' : '100%'}; height: '100%'"><canvas></canvas></div>`.repeat(
          pages.length,
        );
        viewport.innerHTML = pagesHTML;
  
        pages.forEach(page => this.renderPage(page, this.cursorIndex, this.pageMode));
      });
    }

    this.scriptView = document.createElement('script');
    this.scriptView.setAttribute('src', 'https://unpkg.com/pdfjs-dist@2.0.489/build/pdf.min.js');
    this.scriptView.onload = () => this.load();

    this.app = document.createElement('div');
    this.app.setAttribute('id', 'app');
    this.app.innerHTML = `
    <div role="toolbar" id="toolbar">
    <div id="pager">
      <button data-pager="prev">prev</button>
      <button data-pager="next">next</button>
    </div>
    <div id="page-mode">
      <label>Page Mode <input type="number" value="1" min="1"/></label>
    </div>
  </div>
  <div id="viewport-container"><div role="main" id="viewport"></div></div>
  `;
  }

  connectedCallback() {
    this.appendChild(this.styleElement);
    this.appendChild(this.scriptView);
    this.appendChild(this.app);
  }
  load() {
    const that = this;
    this.loadFinish = true;
    window.initPDFViewer = function (pdfURL) {
      that.pdfjsLib = window['pdfjs-dist/build/pdf'];
      that.pdfjsLib.getDocument(pdfURL, { 'origin': 'https://codesandbox.io' } ).promise.then((pdf) => {
        that.pdfInstance = pdf;
        that.totalPagesCount = pdf.numPages;
        that.initPager();
        that.initPageMode();
        that.render();
      });
    };
	
    if(this.pdfURL)
      window.initPDFViewer(this.pdfURL);
  }

  showPDF(pdfurl){
    this.pdfURL = pdfurl;
    if(this.loadFinish)
      window.initPDFViewer(pdfurl);
  }

 
  initPager() {
    const pager = document.querySelector('#pager');
    pager.addEventListener('click',(event) => this.onPagerButtonsClick(event,this));
    return () => {
      pager.removeEventListener('click', this.onPagerButtonsClick);
    };
  }

  onPageModeChange(event, that) {
    that.pageMode = Number(event.target.value);
    that.render();
  }
  initPageMode() {
    const input = document.querySelector('#page-mode input');
    input.setAttribute('max', this.totalPagesCount);
    input.addEventListener('change', (event) => this.onPageModeChange(event, this));
    return () => {
      input.removeEventListener('change', this.onPageModeChange);
    };
  }

  
  renderPage(page,cursorIndex,  pageMode) {
    let pdfViewport = page.getViewport(1);

    const container = viewport.children[page.pageIndex - cursorIndex * pageMode];
    pdfViewport = page.getViewport(container.offsetWidth / pdfViewport.width);
    const canvas = container.children[0];
    const context = canvas.getContext('2d');
    canvas.height = pdfViewport.height;
    canvas.width = pdfViewport.width;

    page.render({
      canvasContext: context,
      viewport: pdfViewport,
    });
  }

  onPagerButtonsClick(event, that) {
    const action = event.target.getAttribute('data-pager');
    if (action === 'prev') {
      if (that.currentPageIndex === 0) {
        return;
      }
      that.currentPageIndex -= that.pageMode;
      if (that.currentPageIndex < 0) {
        that.currentPageIndex = 0;
      }
      that.render();
    }
    if (action === 'next') {
      if (that.currentPageIndex === that.totalPagesCount - 1) {
        return;
      }
      that.currentPageIndex += that.pageMode;
      if (that.currentPageIndex > that.totalPagesCount - 1) {
        that.currentPageIndex = that.totalPagesCount - 1;
      }
      that.render();
    }
  }

}

customElements.define('omnia-pdf-viewer', OMNIAPDFViewerElement);
