// assets/src/components/dashboard/expert/ExpertEarnings.jsx

import { Card, CardContent, Typography, Stack, Divider } from '@mui/material';
import { Paid, PendingActions } from '@mui/icons-material';

export default function ExpertEarnings({ earnings, pendingPayments }) {
    return (
        <Card sx={{ height: '100%' }}>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    Earnings and remuneration
                </Typography>

                <Stack spacing={2} divider={<Divider />}>
                    <Stack direction="row" alignItems="center" spacing={2}>
                        <Paid color="success" />
                        <div>
                            <Typography>Total income</Typography>
                            <Typography variant="h5">€{earnings?.total.toLocaleString()}</Typography>
                        </div>
                    </Stack>

                    <Stack direction="row" alignItems="center" spacing={2}>
                        <PendingActions color="warning" />
                        <div>
                            <Typography>Pending</Typography>
                            <Typography variant="h5">€{pendingPayments?.total.toLocaleString()}</Typography>
                            <Typography variant="body2">
                                {pendingPayments?.count} current payments
                            </Typography>
                        </div>
                    </Stack>
                </Stack>
            </CardContent>
        </Card>
    );
}