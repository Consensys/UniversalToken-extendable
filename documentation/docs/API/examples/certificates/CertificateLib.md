## `CertificateLib`






### `certificateData() → struct CertificateLib.CertificateData ds` (internal)





### `isCertificateSigner(address account) → bool` (internal)





### `usedCertificateNonce(address sender) → uint256` (internal)





### `usedCertificateSalt(bytes32 salt) → bool` (internal)





### `certificateValidationType() → enum CertificateValidationType` (internal)





### `_checkNonceBasedCertificate(address token, address msgSender, bytes payloadWithCertificate, bytes certificate) → bool` (internal)



Checks if a nonce-based certificate is correct


### `_checkSaltBasedCertificate(address token, address msgSender, bytes payloadWithCertificate, bytes certificate) → bool, bytes32` (internal)



Checks if a salt-based certificate is correct




### `CertificateData`


mapping(address => uint256) _usedCertificateNonce


mapping(bytes32 => bool) _usedCertificateSalt


enum CertificateValidationType _certificateType



