import LangRepository from '../repositories/lang/LangRepository.js';

class LangController {
  index(request, response) {
    const langs = LangRepository.findAll();
    response.send(langs);
  }

  show(request, response) {
    const { code } = request.params;

    const lang = LangRepository.findByCode(code);
    if (!lang) {
      response.status(404).send({ message: 'Lang not exists' });
    }

    response.send(lang);
  }
}

export default new LangController();
