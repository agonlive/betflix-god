'use babel';

import BetflixGodView from './betflix-god-view';
import { CompositeDisposable } from 'atom';

export default {

  betflixGodView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.betflixGodView = new BetflixGodView(state.betflixGodViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.betflixGodView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'betflix-god:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.betflixGodView.destroy();
  },

  serialize() {
    return {
      betflixGodViewState: this.betflixGodView.serialize()
    };
  },

  toggle() {
    console.log('BetflixGod was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
