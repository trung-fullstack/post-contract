//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract Poster {
    event PostContent(string content);
    function createPost(string memory content) public {
        emit PostContent(content);
    }
}
