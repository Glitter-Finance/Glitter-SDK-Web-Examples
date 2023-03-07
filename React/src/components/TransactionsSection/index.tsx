import {Card, CardContent, CardHeader, Container, Stack} from "@mui/material";
import Item from "../Item";

function TransactionsSection() {
  return (
    <Container maxWidth="xl">
      <Stack spacing={2}>
        <Card className="transaction-card-layout">
          <CardHeader className="basic-card-header-typo transactions-header" title="Transactions" subheader={<><span
            className="transactions-sub-header">{"More than > 3,584,480,838 transactions found "}</span><span
            className="transactions-sub-header-sub">{" (Showing the last 500k records)"}</span></>}/>
          <CardContent>
            <Stack>
              <Item className="transactions-table-header">
                <Stack direction="row" spacing={2}>
                  <Item className="transactions-table-header-columns">Status</Item>
                  <Item className="transactions-table-header-columns">Time</Item>
                  <Item className="transactions-table-header-columns">Network</Item>
                  <Item className="transactions-table-header-columns">Address</Item>
                  <Item className="transactions-table-header-columns">Token</Item>
                  <Item className="transactions-table-header-columns">Amount</Item>
                  <Item className="transactions-table-header-columns">TXN Links</Item>
                </Stack>
              </Item>
              <Item>
                <Stack direction="row" spacing={2}>
                  <Item className="transactions-table-data-columns success-status">Success</Item>
                  <Item className="transactions-table-data-columns">24-08-2022, 10:30</Item>
                  <Item className="transactions-table-data-columns">Solana → Algorand</Item>
                  <Item className="transactions-table-data-columns">46JC...XKEW</Item>
                  <Item className="transactions-table-data-columns">ALGO → xALGO</Item>
                  <Item className="transactions-table-data-columns">1000.0</Item>
                  <Item className="transactions-table-data-columns">
                    <img src="/algorand-circle.png" alt="Broken"/>
                    <img src="/solana-circle.png" alt="Broken"/>
                  </Item>
                </Stack>
                <Stack direction="row" spacing={2}>
                  <Item className="transactions-table-data-columns failure-status">Failure</Item>
                  <Item className="transactions-table-data-columns">24-08-2022, 10:30</Item>
                  <Item className="transactions-table-data-columns">Solana → Algorand</Item>
                  <Item className="transactions-table-data-columns">46JC...XKEW</Item>
                  <Item className="transactions-table-data-columns">ALGO → xALGO</Item>
                  <Item className="transactions-table-data-columns">1000.0</Item>
                  <Item className="transactions-table-data-columns">
                    <img src="/algorand-circle.png" alt="Broken"/>
                    <img src="/solana-circle.png" alt="Broken"/>
                  </Item>
                </Stack>
                <Stack direction="row" spacing={2}>
                  <Item className="transactions-table-data-columns pending-status">Pending</Item>
                  <Item className="transactions-table-data-columns">24-08-2022, 10:30</Item>
                  <Item className="transactions-table-data-columns">Solana → Algorand</Item>
                  <Item className="transactions-table-data-columns">46JC...XKEW</Item>
                  <Item className="transactions-table-data-columns">ALGO → xALGO</Item>
                  <Item className="transactions-table-data-columns">1000.0</Item>
                  <Item className="transactions-table-data-columns">
                    <img src="/algorand-circle.png" alt="Broken"/>
                    <img src="/solana-circle.png" alt="Broken"/>
                  </Item>
                </Stack>
              </Item>
            </Stack>
          </CardContent>
        </Card>
      </Stack>
    </Container>
  );
}

export default TransactionsSection;
