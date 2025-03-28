import { ButtonGroup, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

export default function LanguageSwitcher() {
    const { i18n } = useTranslation();

    return (
        <ButtonGroup size="small">
            <Button onClick={() => i18n.changeLanguage('fr')}>FR</Button>
            <Button onClick={() => i18n.changeLanguage('en')}>EN</Button>
            <Button onClick={() => i18n.changeLanguage('de')}>DE</Button>
        </ButtonGroup>
    );
}