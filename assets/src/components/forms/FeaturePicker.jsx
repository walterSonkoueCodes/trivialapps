import { useEffect, useState } from 'react';
import {
    Box,
    Typography,
    Chip,
    Paper,
    Grid,
    Avatar,
    Divider
} from '@mui/material';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { motion } from 'framer-motion';

export default function FeaturePicker({ features = [], selected = [], onSelectionChange }) {
    const [available, setAvailable] = useState([]);

    useEffect(() => {
        const unselected = features.filter(f => !selected.includes(f.name));
        setAvailable(unselected);
    }, [features, selected]);

    const handleDragEnd = (result) => {
        const { source, destination } = result;
        if (!destination) return;

        const sourceList = source.droppableId === 'available' ? available : features.filter(f => selected.includes(f.name));
        const destList = destination.droppableId === 'available' ? available : features.filter(f => selected.includes(f.name));

        const [moved] = sourceList.splice(source.index, 1);
        destList.splice(destination.index, 0, moved);

        if (destination.droppableId === 'selected') {
            onSelectionChange([...selected, moved.name]);
        } else {
            onSelectionChange(selected.filter(name => name !== moved.name));
        }

        setAvailable(features.filter(f => !selected.includes(f.name) && f.name !== moved.name));
    };

    return (
        <Box>
            <Typography variant="h6" gutterBottom>
                Choose your features
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Drag and drop features to add or remove them from your selection.
            </Typography>

            <DragDropContext onDragEnd={handleDragEnd}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <Typography variant="subtitle2" sx={{ mb: 1 }}>Available Features</Typography>
                        <Droppable droppableId="available">
                            {(provided) => (
                                <Paper ref={provided.innerRef} {...provided.droppableProps} sx={{ p: 2, minHeight: 200 }}>
                                    {available.map((feature, index) => (
                                        <Draggable key={feature.name} draggableId={feature.name} index={index}>
                                            {(provided) => (
                                                <Box
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    component={motion.div}
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                    sx={{
                                                        display: 'flex', alignItems: 'center', mb: 1, p: 1.5,
                                                        border: '1px solid #ddd', borderRadius: 2,
                                                        backgroundColor: 'background.default'
                                                    }}
                                                >
                                                    <Avatar src={feature.icon} sx={{ mr: 2 }} />
                                                    <Box>
                                                        <Typography fontWeight={600}>{feature.name}</Typography>
                                                        <Typography variant="body2" color="text.secondary">{feature.description}</Typography>
                                                    </Box>
                                                    <Chip
                                                        label={`+${feature.price}€`}
                                                        color="primary"
                                                        size="small"
                                                        sx={{ ml: 'auto' }}
                                                    />
                                                </Box>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </Paper>
                            )}
                        </Droppable>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Typography variant="subtitle2" sx={{ mb: 1 }}>Selected Features</Typography>
                        <Droppable droppableId="selected">
                            {(provided) => (
                                <Paper ref={provided.innerRef} {...provided.droppableProps} sx={{ p: 2, minHeight: 200 }}>
                                    {features
                                        .filter(f => selected.includes(f.name))
                                        .map((feature, index) => (
                                            <Draggable key={feature.name} draggableId={feature.name} index={index}>
                                                {(provided) => (
                                                    <Box
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        component={motion.div}
                                                        whileHover={{ scale: 1.02 }}
                                                        whileTap={{ scale: 0.98 }}
                                                        sx={{
                                                            display: 'flex', alignItems: 'center', mb: 1, p: 1.5,
                                                            border: '1px solid #ddd', borderRadius: 2,
                                                            backgroundColor: '#e8f5e9'
                                                        }}
                                                    >
                                                        <Avatar src={feature.icon} sx={{ mr: 2 }} />
                                                        <Box>
                                                            <Typography fontWeight={600}>{feature.name}</Typography>
                                                            <Typography variant="body2" color="text.secondary">{feature.description}</Typography>
                                                        </Box>
                                                        <Chip
                                                            label={`+${feature.price}€`}
                                                            color="success"
                                                            size="small"
                                                            sx={{ ml: 'auto' }}
                                                        />
                                                    </Box>
                                                )}
                                            </Draggable>
                                        ))}
                                    {provided.placeholder}
                                </Paper>
                            )}
                        </Droppable>
                    </Grid>
                </Grid>
            </DragDropContext>
        </Box>
    );
}