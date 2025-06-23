import React from "react";
import { render, screen } from "@testing-library/react";
import CoinTable from "../components/CoinTable"; // adjust path as needed

const mockCoins = [
  {
    id: "90",
    symbol: "btc",
    name: "Bitcoin",
    price_usd: "69000",
    percent_change_24h: "0.5",
    market_cap_usd: "1000000000",
  },
];

jest.mock("../hooks/useCoinIcons", () => ({
  __esModule: true,
  default: () => ({
    icons: { btc: "https://example.com/btc.svg" },
  }),
}));

describe("CoinTable component", () => {
  it("shows loading spinner when loading is true", () => {
    render(<CoinTable coins={[]} loading={true} error={null} />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it("shows error message when error is passed", () => {
    const error = new Error("API failure");
    render(<CoinTable coins={[]} loading={false} error={error} />);
    expect(screen.getByText(/API failure/i)).toBeInTheDocument();
  });

  it("renders coin rows when data is present", () => {
    render(<CoinTable coins={mockCoins} loading={false} error={null} />);
    expect(screen.getByText(/Bitcoin/i)).toBeInTheDocument();
    expect(screen.getByText(/\$69000/i)).toBeInTheDocument();
    expect(screen.getByText(/0.5%/i)).toBeInTheDocument();
  });
});
