import { render, screen } from "@testing-library/react";
import CoinTable from "../components/coin_table/CoinTable";
import { BrowserRouter } from "react-router-dom";

jest.mock("../components/CoinOverview", () => () => (
  <div data-testid="coin-overview">Mocked CoinOverview</div>
));

const mockCoins = [
  {
    id: "1",
    code: "BTC",
    name: "Bitcoin",
    rate: 30000,
    delta: {
      hour: 0.5,
      day: 2.5,
      week: 5,
      month: 10,
      quarter: 15,
      year: 80,
    },
    png64: "btc.png",
    cap: 600000000000,
  },
  {
    id: "2",
    code: "ETH",
    name: "Ethereum",
    rate: 1800,
    delta: {
      hour: -0.3,
      day: -1.2,
      week: 0,
      month: 5,
      quarter: 10,
      year: 50,
    },
    png64: "eth.png",
    cap: 200000000000,
  },
];

describe("CoinTable", () => {
  it("renders loading state", () => {
    render(
      <BrowserRouter>
        <CoinTable coins={[]} loading />
      </BrowserRouter>
    );
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it("renders coin names", () => {
    render(
      <BrowserRouter>
        <CoinTable coins={mockCoins} />
      </BrowserRouter>
    );

    expect(screen.getByText(/Bitcoin/i)).toBeInTheDocument();

    expect(screen.getByText(/Ethereum/i)).toBeInTheDocument();
  });

  it("renders table headers", () => {
    render(
      <BrowserRouter>
        <CoinTable coins={mockCoins} />
      </BrowserRouter>
    );

    expect(screen.getByText(/name/i)).toBeInTheDocument();
    expect(screen.getByText(/price usd/i)).toBeInTheDocument();
    expect(screen.getByText(/24h %/i)).toBeInTheDocument();
    expect(screen.getByText(/market cap/i)).toBeInTheDocument();
    expect(screen.getByText(/add to watchlist/i)).toBeInTheDocument();
  });
});
