// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract DataTransfer {
    struct Record {
        uint id;
        string ipfsHash;
    }

    mapping(address => Record) public records; // Mapping từ địa chỉ bệnh nhân đến hồ sơ bệnh án
    Record[] public recordsArray;

    // Lưu mã hash của hồ sơ
    function storeRecord(uint _id, string memory ipfsHash) external {
        // require(_id > 0, "Invalid record ID");
        // require(bytes(ipfsHash).length > 0, "Invalid IPFS hash");
        recordsArray.push(Record(_id, ipfsHash)); 
        records[msg.sender].id = _id;
        records[msg.sender].ipfsHash = ipfsHash;
    }

    // Cấp quyền truy cập cho bác sĩ
    // function grantAccess(address doctor) external  {
    //     require(doctor != address(0), "Invalid doctor address");
    //     records[msg.sender].authorizedDoctors.push(doctor);
    // }

    // // Thu hồi quyền truy cập của bác sĩ
    // function revokeAccess(address doctor) external  {
    //     require(doctor != address(0), "Invalid doctor address");

    //     Record storage record = records[msg.sender];
    //     for (uint i = 0; i < record.authorizedDoctors.length; i++) {
    //         if (record.authorizedDoctors[i] == doctor) {
    //             record.authorizedDoctors[i] = record.authorizedDoctors[record.authorizedDoctors.length - 1];
    //             record.authorizedDoctors.pop();
    //             break;
    //         }
    //     }
    // }

    // // Kiểm tra quyền truy cập của bác sĩ và trả về mã hash
    function getRecord(address patient) public view returns (string memory) {
        //require(hasAccess(patient, msg.sender), "You are not authorized to view this record");
        return records[patient].ipfsHash;
    }
    function getId(address patient) public view returns (uint) {
        //require(hasAccess(patient, msg.sender), "You are not authorized to view this record");
        return records[patient].id;
    }
    // // Hàm kiểm tra quyền truy cập nội bộ
    // function hasAccess(address patient, address doctor) private view returns (bool) {
    //     Record storage record = records[patient];
    //     if (patient == doctor) return true; // Chính bệnh nhân có thể xem hồ sơ của họ

    //     for (uint i = 0; i < record.authorizedDoctors.length; i++) {
    //         if (record.authorizedDoctors[i] == doctor) {
    //             return true;
    //         }
    //     }
    //     return false;
    // }

}