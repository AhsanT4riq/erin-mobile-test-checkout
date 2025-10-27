import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput, HelperText, TextInputProps } from 'react-native-paper';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';

interface FormControlTextInputProps<T extends FieldValues>
  extends Omit<TextInputProps, 'value' | 'onChangeText'> {
  name: Path<T>;
  control: Control<T>;
  defaultValue?: string;
}

const FormControlTextInput = <T extends FieldValues>({
  name,
  control,
  defaultValue = '',
  ...textInputProps
}: FormControlTextInputProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue as any}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
      }) => (
        <View style={styles.container}>
          <TextInput
            {...textInputProps}
            mode="outlined"
            value={value || ''}
            onChangeText={onChange}
            onBlur={onBlur}
            error={!!error}
            style={[styles.input, textInputProps.style]}
          />
          {error && (
            <HelperText type="error" visible={!!error} style={styles.errorText}>
              {error.message}
            </HelperText>
          )}
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 10,
  },
  input: {
    maxHeight: 60,
    minHeight: 60,
  },
  errorText: {
    marginTop: 2,
    marginBottom: -8,
  },
});

export default FormControlTextInput;
