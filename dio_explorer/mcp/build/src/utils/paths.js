import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import * as fs from 'fs';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
/**
 * Resolve o caminho para o arquivo trilhas_dio.json.
 * Suporta override via variável de ambiente DIO_DATA_PATH.
 */
export function resolveDataPath() {
    if (process.env['DIO_DATA_PATH']) {
        return process.env['DIO_DATA_PATH'];
    }
    // build/utils/paths.js → ../../data/trilhas_dio.json
    return resolve(__dirname, '..', '..', '..', 'data', 'trilhas_dio.json');
}
/**
 * Resolve o caminho de saída para arquivos gerados (desafio, certificado).
 * Suporta override via variável de ambiente DIO_OUTPUT_DIR.
 */
export function resolveOutputPath(filename) {
    const outputDir = process.env['DIO_OUTPUT_DIR']
        ? process.env['DIO_OUTPUT_DIR']
        : resolve(__dirname, '..', '..', '..', 'docs');
    fs.mkdirSync(outputDir, { recursive: true });
    return resolve(outputDir, filename);
}
//# sourceMappingURL=paths.js.map