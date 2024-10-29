# Healthcare DApp

## Giới thiệu
Dự án này là một ứng dụng phi tập trung (DApp) dành cho lĩnh vực chăm sóc sức khỏe, cho phép bệnh nhân và bác sĩ tương tác hiệu quả. Bệnh nhân có thể khám bệnh, gửi hồ sơ bệnh án qua IPFS, và bác sĩ có thể truy cập hồ sơ bệnh án khi được cấp quyền.

## Chức năng chính
- **Đăng ký**: Bệnh nhân và bác sĩ có thể tạo tài khoản.
- **Khám bệnh**: Bệnh nhân thực hiện khám bệnh và gửi hồ sơ (ảnh) cho bác sĩ.
- **Quản lý hồ sơ**: Bác sĩ có thể truy cập hồ sơ bệnh án khi được cấp quyền.
- **Đánh giá bác sĩ**: Bệnh nhân có thể đánh giá bác sĩ sau khi khám.
- **Crowdfunding**: Bác sĩ có rating từ 4 sao trở lên có thể mở crowdfunding.

## Luồng công việc
1. Bệnh nhân và bác sĩ đăng ký tài khoản.
2. Bệnh nhân thực hiện chức năng khám bệnh và gửi ảnh qua cho bác sĩ.
3. Sau khi kết thúc khám bệnh, bác sĩ sẽ không được truy cập vào mã hash IPFS của bệnh nhân đó nữa.
4. Bệnh nhân có thể xem rating của bác sĩ và đánh giá sau khi khám.
5. Bác sĩ có thể mở crowdfunding nếu có rating trên 4 sao.

## Triển khai
### 1. Triển khai các hợp đồng
- **Deploy trên Layer 1**: Triển khai hợp đồng `Crowdfunding` và `DataTransfer`.
- **Deploy trên Layer 2**: Sau khi hoàn thành trên Layer 1, tiến hành triển khai trên Layer 2.

### 2. Gắn phần đẩy IPFS vào giao diện chính
- Tích hợp chức năng upload và lưu trữ hồ sơ bệnh án lên IPFS.

### 3. Xây dựng lại giao diện cho phù hợp
- Cải tiến giao diện người dùng để đảm bảo dễ sử dụng và phù hợp với logic ứng dụng.

## Tính khả dụng
- Sử dụng các thiết bị khám bệnh để truyền trực tiếp các thông số vào hồ sơ của bệnh nhân.

## Công cụ xây dựng và phát triển
- **Testing/Deploying/Developing Contracts**: Foundry
- **Frameworks**: React, Ethers, zk-ethers, Express, IPFS
- **Languages**: TypeScript, Solidity

## Lưu ý
- Sau khi hoàn thành các phần trên, quay lại để tiến hành testing và thêm Chainlink cùng OpenZeppelin vào dự án.

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
