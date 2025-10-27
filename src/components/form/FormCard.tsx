import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';

import FormDescription from './FormDescription';
import FormHeading from './FormHeading';

interface FormCardProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
}

const FormCard: FC<FormCardProps> = ({ title, description, children }) => {
  return (
    <Card style={styles.card}>
      <Card.Content>
        {title && <FormHeading title={title} />}
        {description && <FormDescription desc={description} />}
        {children}
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
    elevation: 2,
  },
  sectionDescription: {
    marginBottom: 16,
    color: '#666',
  },
  input: {
    marginBottom: 12,
  },
});

export default FormCard;
