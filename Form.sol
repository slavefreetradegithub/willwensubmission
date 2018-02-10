pragma solidity ^0.4.0;

contract Form {
    // The keyword "public" makes those variables
    // readable from outside.
    address public formCreator;
    //yes means slavery, no means ok
    bool isPaidTooLow;
    bool isDangerInEmergency;
    // bool isDangerForSpeakingOut;
    // bool isDifferentJobDescription;
    // bool isIdentityRansomed;
    // bool isChildLabor;
    // bool isCoercion;// are you forced into this job.
    // bool isInDebt; // to the company
    // bool isRestrictedToLeave; 
    // bool isDiscriminated;
    string district;
    // mapping (address => uint) public balances;

    
    // Events allow light clients to react on
    // changes efficiently.
    // event Sent(address from, address to, uint amount);

    // This is the constructor whose code is
    // run only when the contract is created.
    function Form(bool _isPaidTooLow, bool _isDangerInEmergency, string _district) public {
        formCreator = msg.sender;
        isPaidTooLow = _isPaidTooLow;
        isDangerInEmergency = _isDangerInEmergency;
        district = _district;
    }
    
    function getIsPaidTooLow() constant returns (bool){
        return isPaidTooLow;
    }
    function getIsDangerInEmergency() constant returns (bool){
        return isPaidTooLow;
    }
    function getDistrict() constant returns (string){
        return district;
    }
    
    function test() constant returns (string){
        return "hello world";
    }
}