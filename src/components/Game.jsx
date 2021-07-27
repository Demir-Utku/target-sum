/* eslint-disable react-native/no-unused-styles */
/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import RandomNumber from './RandomNumber';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    target: {
        width: 180,
        fontSize: 50,
        backgroundColor: '#bbb',
        color: 'black',
        margin: 70,
        textAlign: 'center',
    },
    randomContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        height: 320,
    },
    button: {
        height: 50,
        width: 250,
        borderRadius: 5,
        backgroundColor: '#0066CC',
        marginBottom: 30,
    },
    buttonText: {
        textAlign: 'center',
        marginTop: 8,
        fontSize: 20,
        color: 'white',
    },
    remainingTime: {
        fontSize: 30,
    },
    STATUS_PLAYING: {
        backgroundColor: '#bbb',
        color: 'black',
    },
    STATUS_WON: {
        backgroundColor: 'green',
        color: '#eee',
    },
    STATUS_LOST: {
        backgroundColor: 'red',
        color: '#eee',
    },
});

const Game = ({ shuffledRandomNumbers, target, initialSeconds, onPlayAgain }) => {
    const [selectedIds, setSelectedIds] = useState([]);
    const [remainingSeconds, setRemainingSeconds] = useState(initialSeconds);

    const isNumberSelected = (numberIndex) => selectedIds.indexOf(numberIndex) >= 0;

    const selectNumber = (numberIndex) => {
        setSelectedIds(selectedIds.concat(numberIndex));
    };

    const gameStatus = () => {
        const sumSelected = selectedIds.reduce((acc, curr) => {
            return acc + shuffledRandomNumbers[curr];
        }, 0);

        if (remainingSeconds === 0) {
            return 'LOST';
        }

        if (sumSelected < target) {
            return 'PLAYING';
        }

        if (sumSelected === target) {
            return 'WON';
        }

        if (sumSelected > target) {
            return 'LOST';
        }
    };

    const status = gameStatus();

    useEffect(() => {
        const interval = setInterval(() => {
            setRemainingSeconds(remainingSeconds - 1);
        }, 1000);

        if (remainingSeconds === 0 || status !== 'PLAYING') clearInterval(interval);

        return () => clearInterval(interval);
    });

    return (
        <View style={styles.container}>
            <Text style={[styles.target, styles[`STATUS_${status}`]]}>{target}</Text>
            <View style={styles.randomContainer}>
                {shuffledRandomNumbers.map((randomNumber, index) => (
                    <RandomNumber
                        key={index}
                        id={index}
                        number={randomNumber}
                        isDisabled={isNumberSelected(index) || status !== 'PLAYING'}
                        onPress={selectNumber}
                    />
                ))}
            </View>
            {status !== 'PLAYING' && (
                <TouchableOpacity onPress={onPlayAgain} style={styles.button}>
                    <Text style={styles.buttonText}>Play Again!</Text>
                </TouchableOpacity>
            )}
            <Text style={styles.remainingTime}>{remainingSeconds}</Text>
        </View>
    );
};

Game.propTypes = {
    shuffledRandomNumbers: PropTypes.array.isRequired,
    target: PropTypes.number.isRequired,
    initialSeconds: PropTypes.number.isRequired,
    onPlayAgain: PropTypes.func.isRequired,
};

export default Game;
