
import React, { useState } from "react";
import { Stack, router } from "expo-router";
import { ScrollView, Pressable, StyleSheet, View, Text, TextInput } from "react-native";
import { IconSymbol } from "@/components/IconSymbol";
import { Button } from "@/components/button";
import { commonStyles, colors } from "@/styles/commonStyles";

export default function AddClientScreen() {
  console.log("Add client screen loaded");

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    website: '',
    notes: ''
  });

  const renderHeaderLeft = () => (
    <Pressable
      onPress={() => {
        console.log("Cancel pressed");
        router.back();
      }}
      style={styles.headerButton}
    >
      <Text style={styles.cancelText}>Cancel</Text>
    </Pressable>
  );

  const renderHeaderRight = () => (
    <Pressable
      onPress={() => {
        console.log("Save client:", formData);
        router.back();
      }}
      style={styles.headerButton}
    >
      <Text style={styles.saveText}>Save</Text>
    </Pressable>
  );

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: "Add Client",
          headerLeft: renderHeaderLeft,
          headerRight: renderHeaderRight,
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTitleStyle: {
            color: colors.text,
            fontWeight: '600',
          },
        }}
      />
      <ScrollView style={commonStyles.container} showsVerticalScrollIndicator={false}>
        <View style={commonStyles.content}>
          <View style={commonStyles.section}>
            <Text style={commonStyles.sectionTitle}>Client Information</Text>
            
            <View style={styles.formGroup}>
              <Text style={styles.label}>Full Name *</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter client's full name"
                placeholderTextColor={colors.textSecondary}
                value={formData.name}
                onChangeText={(value) => updateFormData('name', value)}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Company</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter company name"
                placeholderTextColor={colors.textSecondary}
                value={formData.company}
                onChangeText={(value) => updateFormData('company', value)}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Email *</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter email address"
                placeholderTextColor={colors.textSecondary}
                value={formData.email}
                onChangeText={(value) => updateFormData('email', value)}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Phone</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter phone number"
                placeholderTextColor={colors.textSecondary}
                value={formData.phone}
                onChangeText={(value) => updateFormData('phone', value)}
                keyboardType="phone-pad"
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Website</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter website URL"
                placeholderTextColor={colors.textSecondary}
                value={formData.website}
                onChangeText={(value) => updateFormData('website', value)}
                keyboardType="url"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Notes</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Add any additional notes about the client"
                placeholderTextColor={colors.textSecondary}
                value={formData.notes}
                onChangeText={(value) => updateFormData('notes', value)}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <Button
              onPress={() => {
                console.log("Save client:", formData);
                router.back();
              }}
              disabled={!formData.name || !formData.email}
            >
              Add Client
            </Button>
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  headerButton: {
    padding: 8,
  },
  cancelText: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  saveText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
    marginBottom: 8,
  },
  input: {
    backgroundColor: colors.backgroundAlt,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: colors.text,
    borderWidth: 1,
    borderColor: colors.border,
  },
  textArea: {
    height: 100,
    paddingTop: 12,
  },
  buttonContainer: {
    paddingVertical: 20,
  },
});
