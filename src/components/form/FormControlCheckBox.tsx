import React from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Checkbox, Text, HelperText } from 'react-native-paper';

interface ControlledCheckboxProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  defaultValue?: boolean;
}

const FormControlCheckBox = <T extends FieldValues>({
  name,
  control,
  label,
  defaultValue = false,
}: ControlledCheckboxProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue as any}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <>
          <TouchableOpacity
            style={styles.container}
            onPress={() => onChange(!value)}
            activeOpacity={0.7}
          >
            <Checkbox.Android
              status={value ? 'checked' : 'unchecked'}
              onPress={() => onChange(!value)}
            />
            <Text variant="bodyMedium" style={styles.label}>
              {label}
            </Text>
          </TouchableOpacity>
          {error && (
            <HelperText type="error" visible={!!error} style={styles.errorText}>
              {error.message}
            </HelperText>
          )}
        </>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    flex: 1,
    marginLeft: 8,
  },
  errorText: {
    marginTop: -4,
    marginBottom: 8,
  },
});

export default FormControlCheckBox;
