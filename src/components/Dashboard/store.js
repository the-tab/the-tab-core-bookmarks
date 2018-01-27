import { observable, action } from 'mobx';

class BookmarksStore {
  @observable bookmarks = [];

  @action
  processBookmarks = bookmarks => bookmarks.map((b) => {
    if (b.children) {
      b.children = this.processBookmarks(b.children);
    } else if (!b.meta) {
      b.icon = `https://api.statvoo.com/favicon/?url=${b.url}`;
    }

    return b;
  })

  @action
  getBookmarks = () => {
    chrome.bookmarks.getTree((bookmarks) => {
      this.bookmarks = this.processBookmarks(bookmarks[0].children[0].children);
    });
  }

  @action
  goToFolder = (folder) => {
    this.bookmarks = folder;
  }
}

export default window.bookmarks = new BookmarksStore();
