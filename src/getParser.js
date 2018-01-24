
import yaml from 'js-yaml';
import ini from 'ini';

const obParsers = {
  json: JSON.parse,
  yaml: yaml.safeLoad,
  ini: ini.parse,
};

export default format => obParsers[format];
