// assets/src/components/orders/BudgetPlanning.jsx
import { TextField, Slider } from '@mui/material';

export default function BudgetPlanning({ values, handleChange }) {
    return (
        <div>
            <TextField
                label="Budget estimé (€)"
                name="budget"
                type="number"
                value={values.budget}
                onChange={handleChange}
                fullWidth
                sx={{ mb: 3 }}
            />
            <Slider
                value={values.urgency || 5}
                onChange={(e, val) => handleChange({ target: { name: 'urgency', value: val } })}
                min={1}
                max={10}
                valueLabelDisplay="auto"
            />
        </div>
    );
}