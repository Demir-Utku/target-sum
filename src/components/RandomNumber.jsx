import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
    random: {
        backgroundColor: '#999',
        width: 115,
        marginHorizontal: 10,
        marginVertical: 20,
        fontSize: 35,
        textAlign: 'center',
    },
    disabled: {
        opacity: 0.3,
    },
});

const RandomNumber = ({ id, number, isDisabled, onPress }) => {
    const handlePress = () => {
        if (isDisabled) return;
        onPress(id);
    };

    return (
        <TouchableOpacity onPress={handlePress}>
            <Text style={[styles.random, isDisabled && styles.disabled]}>{number}</Text>
        </TouchableOpacity>
    );
};

RandomNumber.propTypes = {
    id: PropTypes.number.isRequired,
    number: PropTypes.number.isRequired,
    isDisabled: PropTypes.bool.isRequired,
    onPress: PropTypes.func.isRequired,
};

export default RandomNumber;
