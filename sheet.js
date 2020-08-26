const { GoogleSpreadsheet } = require('google-spreadsheet');

module.exports = class Sheet {
  constructor() {
    this.doc = new GoogleSpreadsheet('1o8UZECA89yiD0p3_NenDUs2xbahVaY0769qJ50kAhw0');
  }
  async load() {
    await this.doc.useServiceAccountAuth(require('./credentials.json'));
    await this.doc.loadInfo();
  }
  async addRows(rows) {
    const sheet = this.doc.sheetsByIndex[0]; // or use doc.sheetsById[id]
    await sheet.addRows(rows);
  }
}
