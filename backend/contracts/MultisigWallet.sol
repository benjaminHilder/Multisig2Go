pragma solidity 0.8.17;

contract MultisigWallet {
    uint256 percentageToAgree;
    uint256 amountOfApprovers;

    address[] public approvers; //array is only used for the purpose of a read function, for example on dapp where you want to display the approvers
                                //mapping is used to avoid calling a gas costly for loop function to go through the array and search for an approver

    mapping(address => bool) isApprover;
    mapping(uint256 => proposal) proposals;

    struct proposal {
        string title;
        string description;
        uint256 ethAmount;
        address payable reciever;
        uint256 approvals;
        uint256 disapprovals;
        bool isActive; //is proposal still active
        bool finishedResult;
    }

    //proposal id => user address
    mapping (uint256 => mapping(address => bool)) hasVoted;
    mapping (uint256 => mapping(address => bool)) currentVote;

    uint iterator;
    address contractDeployer;

    constructor(address[] memory _approvers, uint256 _percentageToAgree) {
        for(uint256 i = 0; i < _approvers.length; i++) {
            isApprover[_approvers[i]] = true;
        }
        approvers = _approvers;

        percentageToAgree = _percentageToAgree;
        iterator = 0;
        contractDeployer = msg.sender;
    }

    modifier onlyApprover() {
        require(isApprover[msg.sender] == true,"only an approver can call this function");
        _;
    }

    function deposit() public payable {}

    function createProposal(string memory _title, string memory _description, uint256 _ethAmount, address payable _receiver) public onlyApprover {
        proposal memory newProposal;
        
        newProposal.title = _title;
        newProposal.description = _description;
        newProposal.ethAmount = _ethAmount;
        newProposal.reciever = _receiver;
        newProposal.approvals = 0;
        newProposal.disapprovals = 0;
        newProposal.isActive = true;

        proposals[iterator] = newProposal;
        iterator++;        
    }

    //user can change there vote with this function as well
    function voteOnProposal(uint256 _id, bool _voteValue) public onlyApprover {
        require(proposals[_id].isActive == true, "proposal is not active, only active proposals can be voted on");

        bool hasVotedValue = hasVoted[_id][msg.sender];


        //for changing vote value, user must change to the other vote value
        if (hasVotedValue) { 
            require(currentVote[_id][msg.sender] != _voteValue, "user has already voted this value for this proposal");
        }

        //nested if statements to reduce gas cost (less if statement checking)
        if(hasVotedValue == false){
            if (_voteValue) {
                proposals[_id].approvals += 1;
            } else {
                proposals[_id].disapprovals += 1;
            }

            hasVoted[_id][msg.sender] = true;
            currentVote[_id][msg.sender] = _voteValue;

        } else {
            if (_voteValue) {
                proposals[_id].approvals += 1;
                proposals[_id].disapprovals -= 1;
            } else {
                proposals[_id].approvals -= 1;
                proposals[_id].disapprovals += 1;
            }
        }

        checkIfProposalIsComplete(_id);
    }

    //check if enough vote have gone through to pass or not pass a proposal
    //if so end proposal
    function checkIfProposalIsComplete(uint _id) internal {
        uint amountToApprove = approvers.length * percentageToAgree / 100;
        uint amountToDisapprove = amountToApprove + 1;

        if (proposals[_id].approvals >= amountToApprove) {
            proposals[_id].isActive = false;
            proposals[_id].finishedResult = true;

            proposals[_id].reciever.transfer(proposals[_id].ethAmount);

        } else if (proposals[_id].disapprovals >= amountToDisapprove) {
            proposals[_id].isActive = false;
            proposals[_id].finishedResult = false;
        }
    }

    function getAllApprovers() public view returns(address[] memory) {
        return approvers;
    }

    function getProposalInfo(uint256 _id) public view returns(proposal memory) {
        return proposals[_id];
    }

    //return proposals mapping wouldn't work when trying to display on dapp with js possibly wrote human readable abi incorrect
    //ERROR in js: Uncaught (in promise) null: invalid codepoint at offset 76; unexpected continuation byte
    
    //stack too deep error (in remix) when returning each value in 1 function so a return of each variable seems as the current bandaid fix
    function getProposalTitle(uint256 _id) public view returns(string memory) {
        return proposals[_id].title;
    }

    function getProposalDescription(uint256 _id) public view returns(string memory) {
        return proposals[_id].description;
    }

    function getProposalEthAmount(uint256 _id) public view returns(uint256) {
        return proposals[_id].ethAmount;
    }

    function getProposalReciever(uint256 _id) public view returns(address payable) {
        return proposals[_id].reciever;
    }

    function getProposalApprovals(uint256 _id) public view returns(uint256) {
        return proposals[_id].approvals;
    }

    function getProposalDisapprovals(uint256 _id) public view returns(uint256) {
        return proposals[_id].disapprovals;
    }

    function getProposalIsActive(uint256 _id) public view returns(bool) {
        return proposals[_id].isActive;
    }

    function getProposalFinishedResult(uint256 _id) public view returns(bool) {
        return proposals[_id].finishedResult;
    }
}