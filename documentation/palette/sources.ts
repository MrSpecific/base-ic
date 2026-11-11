import darkCss from '../../src/tokens/dark.css?raw';
import { parseScales, type Scales } from './palette';

const lightFiles = import.meta.glob<string>('../../src/tokens/colors/*.css', {
  query: '?raw',
  import: 'default',
  eager: true,
});

/** Built-in light scales, read from the token files so they never drift. */
export const LIGHT_SCALES: Scales = parseScales(Object.values(lightFiles).join('\n'));
/** Explicit dark values. The OS-preference block is a copy of the class block, so only the first is read. */
export const DARK_SCALES: Scales = parseScales(darkCss.slice(0, darkCss.indexOf('@media')));
