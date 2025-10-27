import React, { FC, Fragment } from 'react';
import { StyleSheet } from 'react-native';
import FormCard from '../form/FormCard';
import { TextInput } from 'react-native-paper';

interface ContactInfoProps {}

const ContactInfoForm: FC<ContactInfoProps> = () => {
  return (
    <Fragment>
      <FormCard description="Please provide your contact information for order updates and delivery.">
        {/* First Name */}
        <TextInput
          label="First Name"
          mode="outlined"
          style={styles.input}
          placeholder="Enter your first name"
        />

        {/* Last Name */}
        <TextInput
          label="Last Name"
          mode="outlined"
          style={styles.input}
          placeholder="Enter your last name"
        />

        {/* Email */}
        <TextInput
          label="Email Address"
          mode="outlined"
          style={styles.input}
          placeholder="email@example.com"
          keyboardType="email-address"
        />

        {/* Phone */}
        <TextInput
          label="Phone Number"
          mode="outlined"
          style={styles.input}
          placeholder="+1 (555) 123-4567"
          keyboardType="phone-pad"
        />
      </FormCard>
      <FormCard title="Additional Information">
        {/* Company (Optional) */}
        <TextInput
          label="Company (Optional)"
          mode="outlined"
          style={styles.input}
          placeholder="Company name"
        />

        {/* Special Instructions */}
        <TextInput
          label="Special Instructions (Optional)"
          mode="outlined"
          style={styles.input}
          placeholder="Any special delivery instructions"
          multiline
          numberOfLines={4}
        />
      </FormCard>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  input: {
    marginBottom: 12,
  },
});

export default ContactInfoForm;
