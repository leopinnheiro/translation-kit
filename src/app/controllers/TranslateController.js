import LangRepository from '../repositories/lang/LangRepository.js';
import MyTranslationPipeline from '../pipelines/MyTranslationPipeline.js';

const translator = await MyTranslationPipeline.getInstance();

class TranslateController {
  async translate(request, response) {
    const { src_lang: sourceLang, tgt_lang: targetLang, text: textToTranslate } = request.body;

    if (!LangRepository.findByCode(sourceLang)) {
      response.status(400).send({ message: `${sourceLang} not exists` });
    }

    if (!LangRepository.findByCode(targetLang)) {
      response.status(400).send({ message: `${targetLang} not exists` });
    }

    const sentences = textToTranslate.split('.').filter(Boolean).map(text => text.trim() + '.');

    const startTime = process.hrtime();
    const translateSentences = await Promise.all(sentences.map(async (sentence) => {
      const [ { translation_text } ]  = await translator(sentence.trim(), {
        src_lang: sourceLang,
        tgt_lang: targetLang,

        // Partial output
        callback_function: x => {
          console.log({
            src_lang: sourceLang,
            tgt_lang: targetLang,
            output: translator.tokenizer.decode(x[0].output_token_ids, { skip_special_tokens: true })
          });
        }
      });

      return translation_text;


    }));
    const endTime = process.hrtime(startTime);

    const translateText = translateSentences.join(' ');

    response.send({
      src_lang: sourceLang,
      tgt_lang: targetLang,
      time_in_ms: (endTime[0] * 1e9 + endTime[1]) / 1e6,
      original_text: textToTranslate,
      translation_text: translateText
    });
  }
}

export default new TranslateController();
