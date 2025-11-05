require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: "0.8.24",
  networks: {
    hardhat: {
      // Mạng mặc định chạy cục bộ (nội bộ của Hardhat)
      chainId: 31337,  // tiêu chuẩn cho local network
      mining: {
        auto: true, // tự động mine block
        interval: 0 // mine ngay lập tức sau mỗi giao dịch
      },
      accounts: {
        count: 10,        // số lượng tài khoản giả lập
        accountsBalance: "10000000000000000000000" // 10,000 ETH mỗi ví
      }
    },
    localhost: {
      url: "http://127.0.0.1:8545", // mạng local do Hardhat node tạo
      chainId: 31337,
    },
  },
};
