## Clone the repo

```bash
git clone https://github.com/ConsenSys/UniversalToken-extendable
```

```bash
cd UniversalToken-extendable
```

## Install the application

This will install all libraries, do a build and clean, and compile the `@openzeppelin` contracts locally to make sure they won't fail. From the root, run:

```bash
yarn
```

???	output "yarn output"
	yarn install v1.22.18
	warning ../../../package.json: No license field
	[1/4] 🔍  Resolving packages...
	warning Resolution field "web3@1.7.3" is incompatible with requested version "web3@1.5.3"
	warning Resolution field "web3@1.7.3" is incompatible with requested version "web3@1.5.3"
	warning Resolution field "web3@1.7.3" is incompatible with requested version "web3@1.5.3"
	warning Resolution field "web3@1.7.3" is incompatible with requested version "web3@1.5.3"
	[2/4] 🚚  Fetching packages...
	warning Pattern ["@truffle/hdwallet-provider@latest"] is trying to unpack in the same destination "/Users/katharine/Library/Caches/Yarn/v6/npm-@truffle-hdwallet-provider-2.0.8-4f2edde26b36356ac8dfe993ed4dece415005be8-integrity/node_modules/@truffle/hdwallet-provider" as pattern ["@truffle/hdwallet-provider@^2.0.8"]. This could result in non-deterministic behavior, skipping.
	[3/4] 🔗  Linking dependencies...
	warning "@openzeppelin/test-helpers > chai-bn@0.2.2" has unmet peer dependency "bn.js@^4.11.0".
	warning " > @typechain/ethers-v5@8.0.5" has incorrect peer dependency "typechain@^6.0.4".
	warning " > @typechain/ethers-v5@8.0.5" has unmet peer dependency "typescript@>=4.0.0".
	warning " > @typechain/ethers-v5@8.0.5" has unmet peer dependency "ethers@^5.1.3".
	warning " > @typechain/ethers-v5@8.0.5" has unmet peer dependency "@ethersproject/bytes@^5.0.0".
	warning " > @typechain/ethers-v5@8.0.5" has unmet peer dependency "@ethersproject/providers@^5.0.0".
	warning " > @typechain/ethers-v5@8.0.5" has unmet peer dependency "@ethersproject/abi@^5.0.0".
	warning "@typechain/ethers-v5 > ts-essentials@7.0.3" has unmet peer dependency "typescript@>=3.7.0".
	warning " > @typechain/truffle-v5@8.0.0" has unmet peer dependency "web3-core@^1".
	warning " > @typechain/truffle-v5@8.0.0" has unmet peer dependency "web3-eth-contract@^1".
	warning " > @typechain/truffle-v5@8.0.0" has unmet peer dependency "web3-utils@^1".
	warning "truffle > @truffle/preserve-to-buckets > ipfs-http-client > native-abort-controller@0.0.3" has unmet peer dependency "abort-controller@*".
	warning "truffle > @truffle/preserve-to-buckets > @textile/hub > @textile/buckets > @improbable-eng/grpc-web@0.13.0" has unmet peer dependency "google-protobuf@^3.2.0".
	warning "truffle > @truffle/preserve-to-buckets > @textile/hub > @textile/hub-filecoin > @improbable-eng/grpc-web@0.12.0" has unmet peer dependency "google-protobuf@^3.2.0".
	warning "truffle > @truffle/preserve-to-buckets > ipfs-http-client > multiaddr > dns-over-http-resolver > native-fetch@3.0.0" has unmet peer dependency "node-fetch@*".
	warning " > typechain@8.0.0" has unmet peer dependency "typescript@>=4.3.0".
	[4/4] 🔨  Building fresh packages...
	[1/23] ⠂ keccak
	[2/23] ⠂ secp256k1
	[11/23] ⠂ @trufflesuite/bigint-buffer
	[10/23] ⠂ sqlite3
	warning Error running install script for optional dependency: "/Users/katharine/Desktop/universal-token-test/UniversalToken-extendable/node_modules/sqlite3: Command failed.
	Exit code: 1
	Command: node-pre-gyp install --fallback-to-build
	Arguments: 
	Directory: /Users/katharine/Desktop/universal-token-test/UniversalToken-extendable/node_modules/sqlite3
	Output:
	node-pre-gyp info it worked if it ends with ok
	node-pre-gyp info using node-pre-gyp@0.11.0
	node-pre-gyp info using node@17.8.0 | darwin | arm64
	node-pre-gyp WARN Using request for node-pre-gyp https download 
	node-pre-gyp info check checked for \"/Users/katharine/Desktop/universal-token-test/UniversalToken-extendable/node_modules/sqlite3/lib/binding/node-v102-darwin-arm64/node_sqlite3.node\" (not found)
	node-pre-gyp http GET https://mapbox-node-binary.s3.amazonaws.com/sqlite3/v4.2.0/node-v102-darwin-arm64.tar.gz
	node-pre-gyp http 403 https://mapbox-node-binary.s3.amazonaws.com/sqlite3/v4.2.0/node-v102-darwin-arm64.tar.gz
	node-pre-gyp WARN Tried to download(403): https://mapbox-node-binary.s3.amazonaws.com/sqlite3/v4.2.0/node-v102-darwin-arm64.tar.gz 
	node-pre-gyp WARN Pre-built binaries not found for sqlite3@4.2.0 and node@17.8.0 (node-v102 ABI, unknown) (falling back to source compile with node-gyp) 
	node-pre-gyp http 403 status code downloading tarball https://mapbox-node-binary.s3.amazonaws.com/sqlite3/v4.2.0/node-v102-darwin-arm64.tar.gz 
	gyp info it worked if it ends with ok
	gyp info using node-gyp@9.0.0
	gyp info using node@17.8.0 | darwin | arm64
	gyp info ok 
	gyp info it worked if it ends with ok
	gyp info using node-gyp@9.0.0
	gyp info using node@17.8.0 | darwin | arm64
	gyp info find Python using Python version 3.9.12 found at \"/opt/homebrew/opt/python@3.9/bin/python3.9\"
	gyp info spawn /opt/homebrew/opt/python@3.9/bin/python3.9
	gyp info spawn args [
	gyp info spawn args   '/opt/homebrew/Cellar/node/17.8.0/libexec/lib/node_modules/npm/node_modules/node-gyp/gyp/gyp_main.py',
	gyp info spawn args   'binding.gyp',
	gyp info spawn args   '-f',
	gyp info spawn args   'make',
	gyp info spawn args   '-I',
	gyp info spawn args   '/Users/katharine/Desktop/universal-token-test/UniversalToken-extendable/node_modules/sqlite3/build/config.gypi',
	gyp info spawn args   '-I',
	gyp info spawn args   '/opt/homebrew/Cellar/node/17.8.0/libexec/lib/node_modules/npm/node_modules/node-gyp/addon.gypi',
	gyp info spawn args   '-I',
	gyp info spawn args   '/Users/katharine/Library/Caches/node-gyp/17.8.0/include/node/common.gypi',
	gyp info spawn args   '-Dlibrary=shared_library',
	gyp info spawn args   '-Dvisibility=default',
	gyp info spawn args   '-Dnode_root_dir=/Users/katharine/Library/Caches/node-gyp/17.8.0',
	gyp info spawn args   '-Dnode_gyp_dir=/opt/homebrew/Cellar/node/17.8.0/libexec/lib/node_modules/npm/node_modules/node-gyp',
	gyp info spawn args   '-Dnode_lib_file=/Users/katharine/Library/Caches/node-gyp/17.8.0/<(target_arch)/node.lib',
	gyp info spawn args   '-Dmodule_root_dir=/Users/katharine/Desktop/universal-token-test/UniversalToken-extendable/node_modules/sqlite3',
	gyp info spawn args   '-Dnode_engine=v8',
	gyp info spawn args   '--depth=.',
	gyp info spawn args   '--no-parallel',
	gyp info spawn args   '--generator-output',
	gyp info spawn args   'build',
	gyp info spawn args   '-Goutput_dir=.'
	gyp info spawn args ]
	gyp info ok 
	gyp info it worked if it ends with ok
	gyp info using node-gyp@9.0.0
	gyp info using node@17.8.0 | darwin | arm64
	gyp info spawn make
	gyp info spawn args [ 'BUILDTYPE=Release', '-C', 'build' ]
	  ACTION deps_sqlite3_gyp_action_before_build_target_unpack_sqlite_dep Release/obj/gen/sqlite-autoconf-3310100/sqlite3.c
	/bin/sh: python: command not found
	make: *** [Release/obj/gen/sqlite-autoconf-3310100/sqlite3.c] Error 127
	gyp ERR! build error 
	gyp ERR! stack Error: `make` failed with exit code: 2
	gyp ERR! stack     at ChildProcess.onExit (/opt/homebrew/Cellar/node/17.8.0/libexec/lib/node_modules/npm/node_modules/node-gyp/lib/build.js:194:23)
	gyp ERR! stack     at ChildProcess.emit (node:events:527:28)
	gyp ERR! stack     at Process.ChildProcess._handle.onexit (node:internal/child_process:291:12)
	gyp ERR! System Darwin 21.5.0
	gyp ERR! command \"/opt/homebrew/Cellar/node/17.8.0/bin/node\" \"/opt/homebrew/Cellar/node/17.8.0/libexec/lib/node_modules/npm/node_modules/node-gyp/bin/node-gyp.js\" \"build\" \"--fallback-to-build\" \"--module=/Users/katharine/Desktop/universal-token-test/UniversalToken-extendable/node_modules/sqlite3/lib/binding/node-v102-darwin-arm64/node_sqlite3.node\" \"--module_name=node_sqlite3\" \"--module_path=/Users/katharine/Desktop/universal-token-test/UniversalToken-extendable/node_modules/sqlite3/lib/binding/node-v102-darwin-arm64\" \"--napi_version=8\" \"--node_abi_napi=napi\" \"--napi_build_version=0\" \"--node_napi_label=node-v102\"
	gyp ERR! cwd /Users/katharine/Desktop/universal-token-test/UniversalToken-extendable/node_modules/sqlite3
	gyp ERR! node -v v17.8.0
	gyp ERR! node-gyp -v v9.0.0
	gyp ERR! not ok 
	node-pre-gyp ERR! build error 
	node-pre-gyp ERR! stack Error: Failed to execute 'node-gyp build --fallback-to-build --module=/Users/katharine/Desktop/universal-token-test/UniversalToken-extendable/node_modules/sqlite3/lib/binding/node-v102-darwin-arm64/node_sqlite3.node --module_name=node_sqlite3 --module_path=/Users/katharine/Desktop/universal-token-test/UniversalToken-extendable/node_modules/sqlite3/lib/binding/node-v102-darwin-arm64 --napi_version=8 --node_abi_napi=napi --napi_build_version=0 --node_napi_label=node-v102' (1)
	node-pre-gyp ERR! stack     at ChildProcess.<anonymous> (/Users/katharine/Desktop/universal-token-test/UniversalToken-extendable/node_modules/node-pre-gyp/lib/util/compile.js:83:29)
	node-pre-gyp ERR! stack     at ChildProcess.emit (node:events:527:28)
	node-pre-gyp ERR! stack     at maybeClose (node:internal/child_process:1090:16)
	node-pre-gyp ERR! stack     at Process.ChildProcess._handle.onexit (node:internal/child_process:302:5)
	node-pre-gyp ERR! System Darwin 21.5.0
	node-pre-gyp ERR! command \"/opt/homebrew/Cellar/node/17.8.0/bin/node\" \"/Users/katharine/Desktop/universal-token-test/UniversalToken-extendable/node_modules/sqlite3/node_modules/.bin/node-pre-gyp\" \"install\" \"--fallback-to-build\"
	node-pre-gyp ERR! cwd /Users/katharine/Desktop/universal-token-test/UniversalToken-extendable/node_modules/sqlite3
	node-pre-gyp ERR! node -v v17.8.0
	node-pre-gyp ERR! node-pre-gyp -v v0.11.0
	node-pre-gyp ERR! not ok 
	Failed to execute 'node-gyp build --fallback-to-build --module=/Users/katharine/Desktop/universal-token-test/UniversalToken-extendable/node_modules/sqlite3/lib/binding/node-v102-darwin-arm64/node_sqliwarning Your current version of Yarn is out of date. The latest version is "1.22.19", while you're on "1.22.18".
	info To upgrade, run the following command:
	$ curl --compressed -o- -L https://yarnpkg.com/install.sh | bash
	$ yarn run build
	yarn run v1.22.18
	warning ../../../package.json: No license field
	$ yarn run clean && truffle compile && yarn run generate-types
	warning ../../../package.json: No license field
	$ del-cli --force ./build && del-cli --force ./types

	Compiling your contracts...

	> Compiling ./contracts/ERC20.sol
	> Compiling ./contracts/ERC721.sol
	> Compiling ./contracts/IERC20Extendable.sol
	> Compiling ./contracts/IERC721Extendable.sol
	> Compiling ./contracts/Migrations.sol
	> Compiling ./contracts/examples/allowblock/allow/AllowExtension.sol
	> Compiling ./contracts/examples/allowblock/allow/IAllowlistedAdminRole.sol
	> Compiling ./contracts/examples/allowblock/allow/IAllowlistedRole.sol
	> Compiling ./contracts/examples/allowblock/block/BlockExtension.sol
	> Compiling ./contracts/examples/allowblock/block/IBlocklistedAdminRole.sol
	> Compiling ./contracts/examples/allowblock/block/IBlocklistedRole.sol
	> Compiling ./contracts/examples/certificates/CertificateLib.sol
	> Compiling ./contracts/examples/certificates/CertificateValidatorExtension.sol
	> Compiling ./contracts/examples/certificates/ICertificateValidator.sol
	> Compiling ./contracts/examples/holds/HoldExtension.sol
	> Compiling ./contracts/examples/holds/HoldStatusCode.sol
	> Compiling ./contracts/examples/holds/IHoldableToken.sol
	> Compiling ./contracts/examples/pausable/IPausable.sol
	> Compiling ./contracts/examples/pausable/PauseExtension.sol
	> Compiling ./contracts/extensions/ExtensionBase.sol
	> Compiling ./contracts/extensions/ExtensionProxy.sol
	> Compiling ./contracts/extensions/IExtension.sol
	> Compiling ./contracts/extensions/IExtensionMetadata.sol
	> Compiling ./contracts/extensions/TokenExtension.sol
	> Compiling ./contracts/tokens/IToken.sol
	> Compiling ./contracts/tokens/TokenERC1820Provider.sol
	> Compiling ./contracts/tokens/eventmanager/ITokenEventManager.sol
	> Compiling ./contracts/tokens/eventmanager/TokenEventConstants.sol
	> Compiling ./contracts/tokens/eventmanager/TokenEventManager.sol
	> Compiling ./contracts/tokens/logic/ERC20/ERC20Logic.sol
	> Compiling ./contracts/tokens/logic/ERC20/IERC20Logic.sol
	> Compiling ./contracts/tokens/logic/ERC721/ERC721Logic.sol
	> Compiling ./contracts/tokens/logic/ERC721/IERC721Logic.sol
	> Compiling ./contracts/tokens/logic/ITokenLogic.sol
	> Compiling ./contracts/tokens/logic/TokenLogic.sol
	> Compiling ./contracts/tokens/proxy/ExtendableTokenProxy.sol
	> Compiling ./contracts/tokens/proxy/IExtendableTokenProxy.sol
	> Compiling ./contracts/tokens/proxy/ITokenProxy.sol
	> Compiling ./contracts/tokens/proxy/TokenProxy.sol
	> Compiling ./contracts/tokens/registry/ERC1155TokenInterface.sol
	> Compiling ./contracts/tokens/registry/ERC20TokenInterface.sol
	> Compiling ./contracts/tokens/registry/ERC721TokenInterface.sol
	> Compiling ./contracts/tokens/storage/RegisteredExtensionStorage.sol
	> Compiling ./contracts/tokens/storage/TokenEventManagerStorage.sol
	> Compiling ./contracts/tokens/storage/TokenProxyStorage.sol
	> Compiling ./contracts/utils/DomainAware.sol
	> Compiling ./contracts/utils/Errors.sol
	> Compiling ./contracts/utils/erc1820/ERC1820Client.sol
	> Compiling ./contracts/utils/erc1820/ERC1820Implementer.sol
	> Compiling ./contracts/utils/erc1820/ERC1820Registry.sol
	> Compiling ./contracts/utils/erc1820/IERC1820Implementer.sol
	> Compiling ./contracts/utils/mocks/Clock.sol
	> Compiling ./contracts/utils/mocks/ERC20LogicMock.sol
	> Compiling ./contracts/utils/mocks/ERC721LogicMock.sol
	> Compiling ./contracts/utils/mocks/MockAllowExtension.sol
	> Compiling ./contracts/utils/mocks/MockBlockExtension.sol
	> Compiling ./contracts/utils/roles/ITokenRoles.sol
	> Compiling ./contracts/utils/roles/Roles.sol
	> Compiling ./contracts/utils/roles/RolesBase.sol
	> Compiling ./contracts/utils/roles/TokenRoles.sol
	> Compiling ./contracts/utils/roles/TokenRolesConstants.sol
	> Compiling @openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol
	> Compiling @openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol
	> Compiling @openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol
	> Compiling @openzeppelin/contracts-upgradeable/token/ERC20/extensions/IERC20MetadataUpgradeable.sol
	> Compiling @openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol
	> Compiling @openzeppelin/contracts-upgradeable/token/ERC721/IERC721ReceiverUpgradeable.sol
	> Compiling @openzeppelin/contracts-upgradeable/token/ERC721/IERC721Upgradeable.sol
	> Compiling @openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721BurnableUpgradeable.sol
	> Compiling @openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721EnumerableUpgradeable.sol
	> Compiling @openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721URIStorageUpgradeable.sol
	> Compiling @openzeppelin/contracts-upgradeable/token/ERC721/extensions/IERC721EnumerableUpgradeable.sol
	> Compiling @openzeppelin/contracts-upgradeable/token/ERC721/extensions/IERC721MetadataUpgradeable.sol
	> Compiling @openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol
	> Compiling @openzeppelin/contracts-upgradeable/utils/ContextUpgradeable.sol
	> Compiling @openzeppelin/contracts-upgradeable/utils/StringsUpgradeable.sol
	> Compiling @openzeppelin/contracts-upgradeable/utils/introspection/ERC165Upgradeable.sol
	> Compiling @openzeppelin/contracts-upgradeable/utils/introspection/IERC165Upgradeable.sol
	> Compiling @openzeppelin/contracts/access/Ownable.sol
	> Compiling @openzeppelin/contracts/token/ERC20/IERC20.sol
	> Compiling @openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol
	> Compiling @openzeppelin/contracts/token/ERC721/IERC721.sol
	> Compiling @openzeppelin/contracts/token/ERC721/extensions/IERC721Metadata.sol
	> Compiling @openzeppelin/contracts/utils/Context.sol
	> Compiling @openzeppelin/contracts/utils/StorageSlot.sol
	> Compiling @openzeppelin/contracts/utils/introspection/IERC165.sol
	> Compiling @openzeppelin/contracts/utils/introspection/IERC1820Registry.sol
	> Compiling @openzeppelin/contracts/utils/math/SafeMath.sol
	> Compiling solidity-bytes-utils/contracts/BytesLib.sol
	> Compilation warnings encountered:

	    Warning: SPDX license identifier not provided in source file. Before publishing, consider adding a comment containing "SPDX-License-Identifier: <SPDX-License>" to each source file. Use "SPDX-License-Identifier: UNLICENSED" for non-open-source code. Please see https://spdx.org for more information.
	--> project:/contracts/ERC721.sol

	,Warning: SPDX license identifier not provided in source file. Before publishing, consider adding a comment containing "SPDX-License-Identifier: <SPDX-License>" to each source file. Use "SPDX-License-Identifier: UNLICENSED" for non-open-source code. Please see https://spdx.org for more information.
	--> project:/contracts/IERC721Extendable.sol

	,Warning: SPDX license identifier not provided in source file. Before publishing, consider adding a comment containing "SPDX-License-Identifier: <SPDX-License>" to each source file. Use "SPDX-License-Identifier: UNLICENSED" for non-open-source code. Please see https://spdx.org for more information.
	--> project:/contracts/tokens/logic/ERC721/ERC721Logic.sol

	,Warning: SPDX license identifier not provided in source file. Before publishing, consider adding a comment containing "SPDX-License-Identifier: <SPDX-License>" to each source file. Use "SPDX-License-Identifier: UNLICENSED" for non-open-source code. Please see https://spdx.org for more information.
	--> project:/contracts/tokens/logic/ERC721/IERC721Logic.sol

	,Warning: SPDX license identifier not provided in source file. Before publishing, consider adding a comment containing "SPDX-License-Identifier: <SPDX-License>" to each source file. Use "SPDX-License-Identifier: UNLICENSED" for non-open-source code. Please see https://spdx.org for more information.
	--> project:/contracts/tokens/registry/ERC1155TokenInterface.sol

	,Warning: SPDX license identifier not provided in source file. Before publishing, consider adding a comment containing "SPDX-License-Identifier: <SPDX-License>" to each source file. Use "SPDX-License-Identifier: UNLICENSED" for non-open-source code. Please see https://spdx.org for more information.
	--> project:/contracts/tokens/registry/ERC721TokenInterface.sol

	,Warning: SPDX license identifier not provided in source file. Before publishing, consider adding a comment containing "SPDX-License-Identifier: <SPDX-License>" to each source file. Use "SPDX-License-Identifier: UNLICENSED" for non-open-source code. Please see https://spdx.org for more information.
	--> project:/contracts/utils/DomainAware.sol

	,Warning: SPDX license identifier not provided in source file. Before publishing, consider adding a comment containing "SPDX-License-Identifier: <SPDX-License>" to each source file. Use "SPDX-License-Identifier: UNLICENSED" for non-open-source code. Please see https://spdx.org for more information.
	--> project:/contracts/utils/Errors.sol

	,Warning: SPDX license identifier not provided in source file. Before publishing, consider adding a comment containing "SPDX-License-Identifier: <SPDX-License>" to each source file. Use "SPDX-License-Identifier: UNLICENSED" for non-open-source code. Please see https://spdx.org for more information.
	--> project:/contracts/utils/erc1820/ERC1820Client.sol

	,Warning: SPDX license identifier not provided in source file. Before publishing, consider adding a comment containing "SPDX-License-Identifier: <SPDX-License>" to each source file. Use "SPDX-License-Identifier: UNLICENSED" for non-open-source code. Please see https://spdx.org for more information.
	--> project:/contracts/utils/erc1820/ERC1820Implementer.sol

	,Warning: SPDX license identifier not provided in source file. Before publishing, consider adding a comment containing "SPDX-License-Identifier: <SPDX-License>" to each source file. Use "SPDX-License-Identifier: UNLICENSED" for non-open-source code. Please see https://spdx.org for more information.
	--> project:/contracts/utils/erc1820/ERC1820Registry.sol

	,Warning: SPDX license identifier not provided in source file. Before publishing, consider adding a comment containing "SPDX-License-Identifier: <SPDX-License>" to each source file. Use "SPDX-License-Identifier: UNLICENSED" for non-open-source code. Please see https://spdx.org for more information.
	--> project:/contracts/utils/erc1820/IERC1820Implementer.sol

	,Warning: SPDX license identifier not provided in source file. Before publishing, consider adding a comment containing "SPDX-License-Identifier: <SPDX-License>" to each source file. Use "SPDX-License-Identifier: UNLICENSED" for non-open-source code. Please see https://spdx.org for more information.
	--> project:/contracts/utils/mocks/Clock.sol

	,Warning: SPDX license identifier not provided in source file. Before publishing, consider adding a comment containing "SPDX-License-Identifier: <SPDX-License>" to each source file. Use "SPDX-License-Identifier: UNLICENSED" for non-open-source code. Please see https://spdx.org for more information.
	--> project:/contracts/utils/mocks/ERC20LogicMock.sol

	,Warning: SPDX license identifier not provided in source file. Before publishing, consider adding a comment containing "SPDX-License-Identifier: <SPDX-License>" to each source file. Use "SPDX-License-Identifier: UNLICENSED" for non-open-source code. Please see https://spdx.org for more information.
	--> project:/contracts/utils/mocks/ERC721LogicMock.sol

	,Warning: SPDX license identifier not provided in source file. Before publishing, consider adding a comment containing "SPDX-License-Identifier: <SPDX-License>" to each source file. Use "SPDX-License-Identifier: UNLICENSED" for non-open-source code. Please see https://spdx.org for more information.
	--> project:/contracts/utils/mocks/MockAllowExtension.sol

	,Warning: SPDX license identifier not provided in source file. Before publishing, consider adding a comment containing "SPDX-License-Identifier: <SPDX-License>" to each source file. Use "SPDX-License-Identifier: UNLICENSED" for non-open-source code. Please see https://spdx.org for more information.
	--> project:/contracts/utils/mocks/MockBlockExtension.sol

	,Warning: SPDX license identifier not provided in source file. Before publishing, consider adding a comment containing "SPDX-License-Identifier: <SPDX-License>" to each source file. Use "SPDX-License-Identifier: UNLICENSED" for non-open-source code. Please see https://spdx.org for more information.
	--> project:/contracts/utils/roles/ITokenRoles.sol

	,Warning: SPDX license identifier not provided in source file. Before publishing, consider adding a comment containing "SPDX-License-Identifier: <SPDX-License>" to each source file. Use "SPDX-License-Identifier: UNLICENSED" for non-open-source code. Please see https://spdx.org for more information.
	--> project:/contracts/utils/roles/Roles.sol

	,Warning: SPDX license identifier not provided in source file. Before publishing, consider adding a comment containing "SPDX-License-Identifier: <SPDX-License>" to each source file. Use "SPDX-License-Identifier: UNLICENSED" for non-open-source code. Please see https://spdx.org for more information.
	--> project:/contracts/utils/roles/RolesBase.sol

	,Warning: SPDX license identifier not provided in source file. Before publishing, consider adding a comment containing "SPDX-License-Identifier: <SPDX-License>" to each source file. Use "SPDX-License-Identifier: UNLICENSED" for non-open-source code. Please see https://spdx.org for more information.
	--> project:/contracts/utils/roles/TokenRoles.sol

	,Warning: SPDX license identifier not provided in source file. Before publishing, consider adding a comment containing "SPDX-License-Identifier: <SPDX-License>" to each source file. Use "SPDX-License-Identifier: UNLICENSED" for non-open-source code. Please see https://spdx.org for more information.
	--> project:/contracts/utils/roles/TokenRolesConstants.sol

	,Warning: Source file does not specify required compiler version! Consider adding "pragma solidity ^0.8.7;"
	--> project:/contracts/utils/Errors.sol

	,Warning: This declaration shadows an existing declaration.
	   --> project:/contracts/examples/pausable/PauseExtension.sol:121:9:
	    |
	121 |         bool isPaused = isPausedFor(data.from);
	    |         ^^^^^^^^^^^^^
	Note: The shadowed declaration is here:
	  --> project:/contracts/examples/pausable/PauseExtension.sol:58:5:
	   |
	58 |     function isPaused() public view override returns (bool) {
	   |     ^ (Relevant source part starts here and spans across multiple lines).

	,Warning: "this" used in constructor. Note that external functions of a contract cannot be called while it is being constructed.
	  --> project:/contracts/examples/holds/HoldExtension.sol:28:27:
	   |
	28 |         _registerFunction(this.hold.selector);
	   |                           ^^^^

	,Warning: "this" used in constructor. Note that external functions of a contract cannot be called while it is being constructed.
	  --> project:/contracts/examples/holds/HoldExtension.sol:29:27:
	   |
	29 |         _registerFunction(this.releaseHold.selector);
	   |                           ^^^^

	,Warning: "this" used in constructor. Note that external functions of a contract cannot be called while it is being constructed.
	  --> project:/contracts/examples/holds/HoldExtension.sol:30:27:
	   |
	30 |         _registerFunction(this.balanceOnHold.selector);
	   |                           ^^^^

	,Warning: "this" used in constructor. Note that external functions of a contract cannot be called while it is being constructed.
	  --> project:/contracts/examples/holds/HoldExtension.sol:31:27:
	   |
	31 |         _registerFunction(this.spendableBalanceOf.selector);
	   |                           ^^^^

	,Warning: "this" used in constructor. Note that external functions of a contract cannot be called while it is being constructed.
	  --> project:/contracts/examples/holds/HoldExtension.sol:32:27:
	   |
	32 |         _registerFunction(this.holdStatus.selector);
	   |                           ^^^^

	,Warning: "this" used in constructor. Note that external functions of a contract cannot be called while it is being constructed.
	 --> project:/contracts/utils/mocks/MockAllowExtension.sol:7:27:
	  |
	7 |         _registerFunction(this.mockUpgradeTest.selector);
	  |                           ^^^^

	,Warning: "this" used in constructor. Note that external functions of a contract cannot be called while it is being constructed.
	 --> project:/contracts/utils/mocks/MockBlockExtension.sol:7:27:
	  |
	7 |         _registerFunction(this.mockUpgradeTest.selector);
	  |                           ^^^^

	,Warning: Function state mutability can be restricted to view
	   --> project:/contracts/examples/allowblock/allow/AllowExtension.sol:118:5:
	    |
	118 |     function onTransferExecuted(TransferData memory data)
	    |     ^ (Relevant source part starts here and spans across multiple lines).

	,Warning: Function state mutability can be restricted to view
	   --> project:/contracts/examples/allowblock/block/BlockExtension.sol:110:5:
	    |
	110 |     function onTransferExecuted(TransferData memory data)
	    |     ^ (Relevant source part starts here and spans across multiple lines).

	,Warning: Function state mutability can be restricted to view
	   --> project:/contracts/examples/pausable/PauseExtension.sol:116:5:
	    |
	116 |     function onTransferExecuted(TransferData memory data)
	    |     ^ (Relevant source part starts here and spans across multiple lines).


	> Artifacts written to /Users/katharine/Desktop/universal-token-test/UniversalToken-extendable/build/contracts
	> Compiled successfully using:
	   - solc: 0.8.7+commit.e28d00a7.Emscripten.clang
	warning ../../../package.json: No license field
	$ typechain --target=truffle-v5 'build/contracts/*.json'
	Could not parse type: function with internal type: function (struct TransferData) external returns (bool).

	Please submit a GitHub Issue to the TypeChain team with the failing contract/library.
	Could not parse type: function with internal type: function (struct TransferData) external returns (bool).

	Please submit a GitHub Issue to the TypeChain team with the failing contract/library.
	Could not parse type: function with internal type: function (struct TransferData) external returns (bool).

	Please submit a GitHub Issue to the TypeChain team with the failing contract/library.
	Could not parse type: function with internal type: function (struct TransferData) external returns (bool).

	Please submit a GitHub Issue to the TypeChain team with the failing contract/library.
	Could not parse type: function with internal type: function (struct TransferData) external returns (bool).

	Please submit a GitHub Issue to the TypeChain team with the failing contract/library.
	Could not parse type: function with internal type: function (struct TransferData) external returns (bool).

	Please submit a GitHub Issue to the TypeChain team with the failing contract/library.
	Could not parse type: function with internal type: function (struct TransferData) external returns (bool).

	Please submit a GitHub Issue to the TypeChain team with the failing contract/library.
	Successfully generated 78 typings!
	✨  Done in 21.96s.
	$ husky install
	husky - Git hooks installed
	✨  Done in 67.92s.


## Set up .env

Create a `.env` file in the project root with the following variables.

```bash
MNEMONIC=fake_mnemonic
RPC_ENDPOINT=fake_rpc_endpoint
ETHERSCAN_API_KEY=fake_etherscan_api_key
```

* `MNEMONIC` is your private key mnemonic.
* `RPC_ENDPOINT` is the network you're using.
* `ETHERSCAN_API_KEY` is used to confirm the transaction on Etherscan and is optional.


## Truffle configurations

Truffle will pick up these variables for the `env` network.

```javascript
module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 9545,
      gas: 6000000,
      network_id: "*", // eslint-disable-line camelcase
    },
    coverage: {
      host: "localhost",
      network_id: "*", // eslint-disable-line camelcase
      port: 8555,
      gas: 0xfffffffffff,
      gasPrice: 0x01,
      // disableConfirmationListener: true,
    },
    env: {
      provider: providerWithMnemonic(
        process.env.MNEMONIC,
        process.env.RPC_ENDPOINT
      ),
      network_id: parseInt(process.env.NETWORK_ID) || "*", // eslint-disable-line camelcase
    },
  },
```

The `development` network in Truffle is set up for Ganache.

The `coverage` network is ???.


## Ensure ERC1820 registry library is deployed

The UniversalToken library uses the ERC1820 registry throughout the smart contract arcitecture. To use the library, you **MUST** have an ERC1820 registry deployed on your network. 

It is likely that there is already an ERC1820 deployed to the network you're using. Check on the relevant block explorer using the key `0x1820a4B7618BdE71Dce8cdc73aAB6C95905faD24`.

If there is no registry on the network, run the registry deployment script which deploys the ERC1820 registry at `0x1820a4B7618BdE71Dce8cdc73aAB6C95905faD24`. The script does nothing if the registry already exists in the network.

To deploy the ERC1820 registry, run the following command, changing the network flag where necessary:

```shell
yarn truffle exec scripts/deployments/registry.js --network env
```

!!!	warning
	The `> ERC1820 deployment: Unknown error { code: -32000, message: 'nonce too low' }` error indicates the registry is already deployed on the network.