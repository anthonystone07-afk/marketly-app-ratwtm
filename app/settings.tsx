
import React from "react";
import { Stack, router } from "expo-router";
import { ScrollView, Pressable, StyleSheet, View, Text, Switch } from "react-native";
import { IconSymbol } from "@/components/IconSymbol";
import { commonStyles, colors } from "@/styles/commonStyles";

export default function SettingsScreen() {
  console.log("Settings screen loaded");

  const renderHeaderLeft = () => (
    <Pressable
      onPress={() => {
        console.log("Back pressed");
        router.back();
      }}
      style={styles.headerButton}
    >
      <IconSymbol name="chevron.left" color={colors.text} size={24} />
    </Pressable>
  );

  const settingsGroups = [
    {
      title: 'Account',
      items: [
        { title: 'Profile', icon: 'person.circle', route: '/profile' },
        { title: 'Business Information', icon: 'building.2', route: '/business-info' },
        { title: 'Subscription', icon: 'creditcard', route: '/subscription' },
      ]
    },
    {
      title: 'Notifications',
      items: [
        { title: 'Push Notifications', icon: 'bell', toggle: true, value: true },
        { title: 'Email Reports', icon: 'envelope', toggle: true, value: true },
        { title: 'Campaign Alerts', icon: 'exclamationmark.triangle', toggle: true, value: false },
      ]
    },
    {
      title: 'Data & Privacy',
      items: [
        { title: 'Data Export', icon: 'square.and.arrow.up', route: '/data-export' },
        { title: 'Privacy Settings', icon: 'lock', route: '/privacy' },
        { title: 'Connected Accounts', icon: 'link', route: '/connected-accounts' },
      ]
    },
    {
      title: 'Support',
      items: [
        { title: 'Help Center', icon: 'questionmark.circle', route: '/help' },
        { title: 'Contact Support', icon: 'message', route: '/contact-support' },
        { title: 'Send Feedback', icon: 'heart', route: '/feedback' },
      ]
    },
    {
      title: 'About',
      items: [
        { title: 'Terms of Service', icon: 'doc.text', route: '/terms' },
        { title: 'Privacy Policy', icon: 'hand.raised', route: '/privacy-policy' },
        { title: 'App Version', icon: 'info.circle', subtitle: '1.0.0' },
      ]
    }
  ];

  const renderSettingItem = (item: any, groupIndex: number, itemIndex: number) => (
    <Pressable
      key={`${groupIndex}-${itemIndex}`}
      style={styles.settingItem}
      onPress={() => {
        if (item.route) {
          console.log(`Navigate to ${item.route}`);
          router.push(item.route);
        } else if (item.toggle) {
          console.log(`Toggle ${item.title}`);
        }
      }}
      disabled={item.toggle || !item.route}
    >
      <View style={styles.settingLeft}>
        <View style={styles.settingIcon}>
          <IconSymbol name={item.icon} color={colors.primary} size={20} />
        </View>
        <View style={styles.settingText}>
          <Text style={styles.settingTitle}>{item.title}</Text>
          {item.subtitle && (
            <Text style={styles.settingSubtitle}>{item.subtitle}</Text>
          )}
        </View>
      </View>
      <View style={styles.settingRight}>
        {item.toggle ? (
          <Switch
            value={item.value}
            onValueChange={(value) => {
              console.log(`${item.title} toggled to ${value}`);
            }}
            trackColor={{ false: colors.border, true: colors.primary }}
            thumbColor={item.value ? 'white' : colors.textSecondary}
          />
        ) : item.route ? (
          <IconSymbol name="chevron.right" color={colors.textSecondary} size={16} />
        ) : null}
      </View>
    </Pressable>
  );

  return (
    <>
      <Stack.Screen
        options={{
          title: "Settings",
          headerLeft: renderHeaderLeft,
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
          {/* Profile Summary */}
          <View style={styles.profileSection}>
            <View style={styles.profileCard}>
              <View style={styles.profileAvatar}>
                <IconSymbol name="person.circle.fill" color={colors.primary} size={60} />
              </View>
              <View style={styles.profileInfo}>
                <Text style={styles.profileName}>John Doe</Text>
                <Text style={styles.profileEmail}>john@digitalmarketing.com</Text>
                <Text style={styles.profilePlan}>Pro Plan</Text>
              </View>
            </View>
          </View>

          {/* Settings Groups */}
          {settingsGroups.map((group, groupIndex) => (
            <View key={groupIndex} style={commonStyles.section}>
              <Text style={commonStyles.sectionTitle}>{group.title}</Text>
              <View style={commonStyles.card}>
                {group.items.map((item, itemIndex) => renderSettingItem(item, groupIndex, itemIndex))}
              </View>
            </View>
          ))}

          {/* Sign Out */}
          <View style={commonStyles.section}>
            <Pressable
              style={styles.signOutButton}
              onPress={() => {
                console.log("Sign out pressed");
              }}
            >
              <IconSymbol name="arrow.right.square" color={colors.error} size={20} />
              <Text style={styles.signOutText}>Sign Out</Text>
            </Pressable>
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
  profileSection: {
    paddingTop: 16,
    paddingBottom: 8,
  },
  profileCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  profileAvatar: {
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  profilePlan: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.primary,
    backgroundColor: colors.backgroundAlt,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.backgroundAlt,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingText: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
  },
  settingSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 2,
  },
  settingRight: {
    marginLeft: 12,
  },
  signOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.error,
  },
  signOutText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.error,
    marginLeft: 8,
  },
});
