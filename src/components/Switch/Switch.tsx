import Typography from '@component/Typography';
import React, { useState } from 'react';
import { View, StyleSheet, Switch } from 'react-native';

interface ToggleSwitchProps {
    label: string;
    initialValue?: boolean;
    onValueChange?: (value: boolean) => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
    label,
    initialValue = false,
    onValueChange,
}) => {
    const [isEnabled, setIsEnabled] = useState(initialValue);

    const toggleSwitch = () => {
        const newValue = !isEnabled;
        setIsEnabled(newValue);
        if (onValueChange) {
            onValueChange(newValue);
        }
    };

    return (
        <View style={styles.container}>
            <Typography text={label} styleProps={styles.label} />
            <Switch
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        marginVertical: 5,
        backgroundColor: '#fff',
        borderRadius: 16,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 3,
    },
    label: { color: '#000', fontSize: 14 },
});

export default ToggleSwitch;
