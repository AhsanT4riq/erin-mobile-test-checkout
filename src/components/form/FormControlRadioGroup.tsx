import React, { Fragment } from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { StyleSheet } from 'react-native';
import { RadioButton, HelperText, Divider } from 'react-native-paper';

import DeliveryOption from '../address/DeliveryOption';

export interface RadioOption {
  label: string;
  value: string;
  description?: string;
}

interface ControlledRadioGroupProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  options: RadioOption[];
  defaultValue?: string;
}

const FormControlRadioGroup = <T extends FieldValues>({
  name,
  control,
  options,
  defaultValue = '',
}: ControlledRadioGroupProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue as any}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <>
          <RadioButton.Group onValueChange={onChange} value={value || ''}>
            {options.map((option, index) => (
              <Fragment key={option.value}>
                <DeliveryOption option={option} onPress={onChange} />
                {index < options.length - 1 && <Divider />}
              </Fragment>
            ))}
          </RadioButton.Group>
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
  option: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  optionContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
  },
  description: {
    color: '#666',
    marginTop: 4,
  },
  errorText: {
    marginTop: 4,
  },
});

export default FormControlRadioGroup;
