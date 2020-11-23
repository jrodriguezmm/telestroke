<?php
// declare(strict_types=1);
// Para forzar el uso de tipado fuerte: PHP no hará 'casts' sin que se le diga específicamente

// Basado en
// https://stackoverflow.com/questions/16600708/how-do-you-encrypt-and-decrypt-a-php-string
// y
// https://stackoverflow.com/questions/9262109/simplest-two-way-encryption-using-php
class telestrokeCypherSF {
    private $w_p;
    private $v;
    public $salt;
    public $key = 'hRVFGcuiY4DsDbLwXaiWPHdecBdmVbQpi6SS5sZ2304kZ3xlZtCdHvVG97SzcKwA';
    const METHOD = 'aes-256-ctr';

    /**
     * Construye un objecto telestrokeCypherSF, usado para la generación de llaves y cifrado/descifrado cadenas de caracteres.
     * 
     * @param string $weak_password - contraseña sencilla que será usada para la generación de contraseña fuerte
     * @param string $pass_file - nombre del archivo en que la llave está/será guardada
     * @param boolean $verbose - establecer como verdadero (TRUE) para imprimir información relacionada con el almacenamiento de la llave
     */
    function __construct($w_p='some_weak_password', $verbose=FALSE) {// bool $verbose=FALSE) {
        $this->w_p = $w_p; // Por razones históricas
        $this->salt = "\x2d\xb7\x68\x1a\x28\x15\xb4\x0f\x33\xa0\x7e\x0e\x8f\x70\xd5\xdf";
        $this->v = $verbose;
    }

    /**
     * Consigue la llave ya sea al encontrar el archivo en que está guardada, o generándola como hash a partir de la contraseña sencilla que fue entregada al constructor de la clase.
     */
    public function getKey($login) {
        $decrypted = $this->decrypt($this->key, $login . $this->salt);
        return $decrypted;
    }

    /**
     * Genera la clave fuerte desde la clave sencilla que fue entregada al constructor de la clase. Esta función existe por razones históricas, y ya no es usada.
     * @param int $keysize - tamaño en bytes del hash generado
     */
    private function getKeyFromPassword($keysize=16){
        return hash_pbkdf2(
            'sha256',
            $this->w_p,
            $this->salt,
            100000, // Número de iteraciones
            $keysize,
            TRUE
        );
    }

    /**
     * Cifra un mensaje
     * 
     * @param string $message - mensaje en texto plano
     * @param string $key - llave de cifrado (espera un binario crudo)
     * @param boolean $encode - asignar TRUE para retornar cadena de caracteres codificados en base64
     * @return string (binario crudo)
     */
    public static function encrypt($message, $key, $encode=TRUE)
    {
        $nonceSize = openssl_cipher_iv_length(self::METHOD);
        $nonce = openssl_random_pseudo_bytes($nonceSize);

        $ciphertext = openssl_encrypt(
            $message,
            self::METHOD,
            $key,
            OPENSSL_RAW_DATA,
            $nonce
        );

        // (IV significa Initialization Vector -> Vector de Inicialización, que es el vector inicial con el que se aplica XOR a cada uno de los bloques en el algoritmo AES, aqui llamado NONCE)
        // Podemos concatenar el texto cifrado con el nonce y codificar en base 64, si se requiere (por defecto se requiere)
        if ($encode) {
            return base64_encode($nonce.$ciphertext);
        }
        return $nonce.$ciphertext;
    }

    /**
     * Descrifra un mensaje
     * 
     * @param string $message - mensaje cifrado de texto
     * @param string $key - llave de cifrado (espera un binario crudo)
     * @param boolean $encoded - asignar TRUE para especificar que se espera una cadena de caracteres codificada en base64
     * @return string (mensaje descifrado)
     */
    public static function decrypt($message, $key, $encoded=TRUE)
    {
        if ($encoded) {
            $message = base64_decode($message, TRUE);
            if ($message === FALSE) {
                throw new Exception('Encryption failure');
            }
        }

        $nonceSize = openssl_cipher_iv_length(self::METHOD);
        // Dividir el mensaje en partes, por la concatenación que se hizo al encriptar
        $nonce = mb_substr($message, 0, $nonceSize, '8bit');
        $ciphertext = mb_substr($message, $nonceSize, null, '8bit');

        $plaintext = openssl_decrypt(
            $ciphertext,
            self::METHOD,
            $key,
            OPENSSL_RAW_DATA,
            $nonce
        );

        return $plaintext;
    }
}

function get_hash($plaintext) {
    $salt = "esta_es_la_sal_de_telestroke";
    return hash("sha256", $plaintext.$salt);
}

?>