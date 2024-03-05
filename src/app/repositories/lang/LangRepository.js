import { Langs } from './LangData.js';

class LangRepositoy {
  data = Langs;

  findAll() {
    return this.data;
  }

  findByCode(code) {
    return this.data.find((lang) => lang.code === code);
  }
}

export default new LangRepositoy();
