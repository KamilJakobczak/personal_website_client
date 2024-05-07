import esbuild from 'esbuild-wasm';
import { fetchPlugin } from './plugins/fetch-plugin';
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';

let esbuildInit: Promise<void>;

export const setupBundler = () => {
  if (!esbuildInit) {
    esbuildInit = esbuild.initialize({
      worker: true,
      wasmURL: 'https://unpkg.com/esbuild-wasm@0.15.18/esbuild.wasm',
    });
  }
};

const Bundler = async (rawCode: string) => {
  await esbuildInit;
  try {
    const result = await esbuild.build({
      entryPoints: ['index.js'],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(rawCode)],
      define: {
        'process.env.NODE_ENV': '"production"',
        global: 'window',
      },
      jsxFactory: '_React.createElement',
      jsxFragment: '_React.Fragment',
    });
    return {
      code: result.outputFiles[0].text,
      err: '',
    };
  } catch (err) {
    if (err instanceof Error) {
      return {
        code: '',
        err: err.message,
      };
    } else {
      throw err;
    }
  }
};

export default Bundler;
