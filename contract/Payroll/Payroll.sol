// SPDX-License-Identifier: MIT
pragma solidity ^0.8.34;

contract Payroll {

    event Deposit(address indexed from, uint256 amount);

    uint256 private constant MONTH = 30 days;

    address public immutable owner;
    bool public paused;
    uint256 public totalEmployees;

    struct Employee {
        uint256 monthlySalary;
        uint256 salaryPerSecond;
        uint256 lastClaim;
        uint256 totalClaimed;
        bool active;
    }

    mapping(address => Employee) public employees;
    address[] private employeeList;

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    modifier notPaused() {
        require(!paused, "paused");
        _;
    }

    constructor(address _owner) {
        owner = _owner;
    }

    receive() external payable {
        emit Deposit(msg.sender, msg.value);
    }

    function addEmployee(address employee, uint256 monthlySalary) external onlyOwner {
        require(employee != address(0), "Invalid employee address");
        require(monthlySalary > 0, "Salary must be greater than zero");
        require(!employees[employee].active, "Employee already exists");

        employees[employee] = Employee({
            monthlySalary: monthlySalary,
            salaryPerSecond: monthlySalary / MONTH,
            lastClaim: block.timestamp,
            totalClaimed: 0,
            active: true
        });
        employeeList.push(employee);
        totalEmployees++;
    }

    function updateSalary(address employee, uint256 newSalary) external onlyOwner {
        require(employees[employee].active, "Employee does not exist");
        require(newSalary > 0, "Salary must be greater than zero");

        Employee storage emp = employees[employee];
        
        emp.monthlySalary = newSalary;
        emp.salaryPerSecond = newSalary / MONTH;

    }

}
