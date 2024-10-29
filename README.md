-Deploy các contract: Lên layer1 thành công rồi mới đẩy lên layer2
+deploy thằng crowdfunding
+deploy thằng dataTransfer
-Gắn phần đẩy IPFS vào giao diện chính
-Xây dựng lại giao diện cho phù hợp
===================================
-Hoàn thành các phần này thì quay lại testing và thêm chainlink và openzepplin
===================================
-Logic:
+Bệnh nhân và Bác sĩ sẽ đăng kí
+Bệnh nhân thực hiện chức năng khám bệnh
+Gửi Ảnh qua cho bác sĩ
+Nếu kết thúc khám bệnh thì bác sĩ sẽ không được truy cập vào lấy mã hash ipfs của bệnh nhân đó nữa
-Logic thêm:
+Các bác sĩ có rating trên 4* thì có thể mở crowdfunding
+Bệnh nhân khám bác sĩ đó có thể coi rating của bác sĩ
+Khi khám xong bệnh nhân có thể rating bác sĩ đã khám
-Availability: Nhúng các thiết bị khám bệnh, truyền trực tiếp các thông số vào hồ sơ của bệnh nhân
===================================
-Các công cụ xây dựng và phát triển
+Testing/ Deploying/ Developing Contract: Foundry
+Framework: React, Ethers, zk-ethers, express, ipfs,..
+Languages: TypeScript, Solidity,...
## Foundry

**Foundry is a blazing fast, portable and modular toolkit for Ethereum application development written in Rust.**

Foundry consists of:

-   **Forge**: Ethereum testing framework (like Truffle, Hardhat and DappTools).
-   **Cast**: Swiss army knife for interacting with EVM smart contracts, sending transactions and getting chain data.
-   **Anvil**: Local Ethereum node, akin to Ganache, Hardhat Network.
-   **Chisel**: Fast, utilitarian, and verbose solidity REPL.

## Documentation

https://book.getfoundry.sh/

## Usage

### Build

```shell
$ forge build
```

### Test

```shell
$ forge test
```

### Format

```shell
$ forge fmt
```

### Gas Snapshots

```shell
$ forge snapshot
```

### Anvil

```shell
$ anvil
```

### Deploy

```shell
$ forge script script/Counter.s.sol:CounterScript --rpc-url <your_rpc_url> --private-key <your_private_key>
```

### Cast

```shell
$ cast <subcommand>
```

### Help

```shell
$ forge --help
$ anvil --help
$ cast --help
```
