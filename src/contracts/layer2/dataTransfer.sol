// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract DataTransfer {
    struct Record {
        uint id;
        string ipfsHash;
        address authorizedDoctor;
        address owner;
    }

    Record[] public records;

    function storeRecord(uint _id, string memory ipfsHash) external {
        require(_id > 0, "Invalid record ID");
        require(bytes(ipfsHash).length > 0, "Invalid IPFS hash");

        // Lưu bản ghi với địa chỉ người gửi là chủ sở hữu
        records.push(Record({
            id: _id,
            ipfsHash: ipfsHash,
            authorizedDoctor: address(0),      
            owner: msg.sender
        }));
    }

    // Cấp quyền truy cập cho bác sĩ
    function grantAccess(address doctor) external {
        require(doctor != address(0), "Invalid doctor address");


        for (uint i = 0; i < records.length; i++) {
            if (records[i].owner == msg.sender) {
                records[i].authorizedDoctor = doctor; 
                return;
            }
        }
        revert("Record not found");
    }

    // Thu hồi quyền truy cập của bác sĩ
    function revokeAccess() external {
        for (uint i = 0; i < records.length; i++) {
            if (records[i].owner == msg.sender) {
                records[i].authorizedDoctor = address(0); 
                return; 
            }
        }
        revert("Record not found");
    }

    // Hàm kiểm tra quyền truy cập
    function hasAccess(address patient, address doctor) public view returns (bool) {
        for (uint i = 0; i < records.length; i++) {
            if (records[i].owner == patient) {
                if (patient == doctor) return true;
                return records[i].authorizedDoctor == doctor; 
            }
        }
        return false; 
    }
}
