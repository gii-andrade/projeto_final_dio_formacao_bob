/**
 * Resolve o caminho para o arquivo trilhas_dio.json.
 * Suporta override via variável de ambiente DIO_DATA_PATH.
 */
export declare function resolveDataPath(): string;
/**
 * Resolve o caminho de saída para arquivos gerados (desafio, certificado).
 * Suporta override via variável de ambiente DIO_OUTPUT_DIR.
 */
export declare function resolveOutputPath(filename: string): string;
