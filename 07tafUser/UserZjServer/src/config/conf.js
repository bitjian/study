import TafConfig from '@taf/taf-config';
import { logger } from '../common';
import pkg from '../../package.json';
import localConfig from './config.json';

const fileName = `${pkg.name}.conf`;
const conf = {};
conf.config = localConfig;

conf.init = async () => {
  if (process.env.TAF_CONFIG) {
    logger.data.info(`load config from Taf: ${fileName}`);
    try {
      const tafConfig = new TafConfig({ fileName });
      const allConfigData = await tafConfig.getAllConfigData();
      conf.config = JSON.parse(allConfigData[fileName]);
      logger.data.info('load config from Taf', conf.config);
    } catch (err) {
      logger.error.error('load Taf config error', err);
      throw err;
    }
  } else {
    logger.data.info('load config from local', conf.config);
  }
};

export default conf;
