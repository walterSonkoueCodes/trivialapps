import { Typography, Container, Link } from '@mui/material';

export default function LegalPage() {
    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Section title="DUMMY DATA">
                <Typography paragraph>
                    DUMMY DATA
                </Typography>
            </Section>
            <Typography variant="h3" gutterBottom>
                Mentions Légales
            </Typography>

            <Section title="Éditeur du site">
                <Typography paragraph>
                    Société TrivialApps SAS au capital de 10 000 €<br />
                    RCS Paris 123 456 789<br />
                    Adresse : 123 Rue Digitale, 75000 Paris
                </Typography>
            </Section>

            <Section title="Hébergement">
                <Typography paragraph>
                    OVH SAS<br />
                    2 rue Kellermann - 59100 Roubaix - France
                </Typography>
            </Section>

            <Section title="Données personnelles">
                <Typography paragraph>
                    Conformément au RGPD, vous pouvez exercer vos droits d'accès, de
                    rectification ou de suppression via notre <Link href="/contact">formulaire de contact</Link>.
                </Typography>
            </Section>
            <Section title="DUMMY DATA">
                <Typography paragraph>

                </Typography>
            </Section>
        </Container>
    );
}

function Section({ title, children }) {
    return (
        <div style={{ marginBottom: '2rem' }}>
            <Typography variant="h5" gutterBottom>
                {title}
            </Typography>
            {children}
        </div>
    );
}