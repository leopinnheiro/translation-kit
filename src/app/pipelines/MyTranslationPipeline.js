// https://huggingface.co/models?pipeline_tag=translation&library=transformers.js
// https://github.com/facebookresearch/flores/blob/main/flores200/README.md#languages-in-flores-200
import { pipeline, env } from '@xenova/transformers';

class MyTranslationPipeline {
  static task = 'translation';
  static model = 'Xenova/nllb-200-distilled-600M';
  static instance = null;

  static async getInstance(progressCallback = null) {
    if (this.instance === null) {
      // NOTE: Uncomment this to change the cache directory
      env.cacheDir = './.cache';

      this.instance = pipeline(this.task, this.model, { progress_callback: progressCallback });
    }

    return this.instance;
  }
}

export default MyTranslationPipeline;
