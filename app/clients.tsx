
import React, { useState } from "react";
import { Stack, router } from "expo-router";
import { ScrollView, Pressable, StyleSheet, View, Text, TextInput } from "react-native";
import { IconSymbol } from "@/components/IconSymbol";
import { Button } from "@/components/button";
import { commonStyles, colors } from "@/styles/commonStyles";

interface Client {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive' | 'pending';
  projects: number;
  revenue: string;
}

export default function ClientsScreen() {
  console.log("Clients screen loaded");

  const [searchQuery, setSearchQuery] = useState("");
  const [clients] = useState<Client[]>([
    {
      id: '1',
      name: 'John Smith',
      company: 'TechCorp Inc.',
      email: 'john@techcorp.com',
      phone: '+1 (555) 123-4567',
      status: 'active',
      projects: 3,
      revenue: '$15,000'
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      company: 'StartupXYZ',
      email: 'sarah@startupxyz.com',
      phone: '+1 (555) 987-6543',
      status: 'active',
      projects: 2,
      revenue: '$8,500'
    },
    {
      id: '3',
      name: 'Mike Davis',
      company: 'Local Business Co.',
      email: 'mike@localbiz.com',
      phone: '+1 (555) 456-7890',
      status: 'pending',
      projects: 1,
      revenue: '$3,200'
    },
    {
      id: '4',
      name: 'Emily Chen',
      company: 'E-commerce Plus',
      email: 'emily@ecomplus.com',
      phone: '+1 (555) 321-0987',
      status: 'active',
      projects: 4,
      revenue: '$22,000'
    }
  ]);

  const renderHeaderRight = () => (
    <Pressable
      onPress={() => {
        console.log("Add client pressed");
        router.push("/add-client");
      }}
      style={styles.headerButton}
    >
      <IconSymbol name="plus" color={colors.text} size={24} />
    </Pressable>
  );

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

  const getStatusColor = (status: Client['status']) => {
    switch (status) {
      case 'active':
        return colors.success;
      case 'pending':
        return colors.warning;
      case 'inactive':
        return colors.error;
      default:
        return colors.textSecondary;
    }
  };

  const getStatusText = (status: Client['status']) => {
    switch (status) {
      case 'active':
        return 'Active';
      case 'pending':
        return 'Pending';
      case 'inactive':
        return 'Inactive';
      default:
        return 'Unknown';
    }
  };

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderClient = (client: Client) => (
    <Pressable
      key={client.id}
      style={commonStyles.card}
      onPress={() => {
        console.log(`Client ${client.name} pressed`);
        router.push(`/client-details?id=${client.id}`);
      }}
    >
      <View style={styles.clientHeader}>
        <View style={styles.clientInfo}>
          <Text style={styles.clientName}>{client.name}</Text>
          <Text style={commonStyles.textSecondary}>{client.company}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(client.status) }]}>
          <Text style={styles.statusText}>{getStatusText(client.status)}</Text>
        </View>
      </View>
      
      <View style={styles.clientDetails}>
        <View style={styles.detailRow}>
          <IconSymbol name="envelope" color={colors.textSecondary} size={16} />
          <Text style={[commonStyles.textSecondary, { marginLeft: 8 }]}>{client.email}</Text>
        </View>
        <View style={styles.detailRow}>
          <IconSymbol name="phone" color={colors.textSecondary} size={16} />
          <Text style={[commonStyles.textSecondary, { marginLeft: 8 }]}>{client.phone}</Text>
        </View>
      </View>

      <View style={commonStyles.divider} />

      <View style={commonStyles.row}>
        <View style={commonStyles.metric}>
          <Text style={commonStyles.metricValue}>{client.projects}</Text>
          <Text style={commonStyles.metricLabel}>Projects</Text>
        </View>
        <View style={styles.metricDivider} />
        <View style={commonStyles.metric}>
          <Text style={[commonStyles.metricValue, { color: colors.success }]}>{client.revenue}</Text>
          <Text style={commonStyles.metricLabel}>Revenue</Text>
        </View>
      </View>
    </Pressable>
  );

  return (
    <>
      <Stack.Screen
        options={{
          title: "Clients",
          headerRight: renderHeaderRight,
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
          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <View style={styles.searchBar}>
              <IconSymbol name="magnifyingglass" color={colors.textSecondary} size={20} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search clients..."
                placeholderTextColor={colors.textSecondary}
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>
          </View>

          {/* Stats Overview */}
          <View style={commonStyles.section}>
            <View style={commonStyles.card}>
              <View style={commonStyles.row}>
                <View style={commonStyles.metric}>
                  <Text style={[commonStyles.metricValue, { color: colors.primary }]}>{clients.length}</Text>
                  <Text style={commonStyles.metricLabel}>Total Clients</Text>
                </View>
                <View style={styles.metricDivider} />
                <View style={commonStyles.metric}>
                  <Text style={[commonStyles.metricValue, { color: colors.success }]}>
                    {clients.filter(c => c.status === 'active').length}
                  </Text>
                  <Text style={commonStyles.metricLabel}>Active</Text>
                </View>
                <View style={styles.metricDivider} />
                <View style={commonStyles.metric}>
                  <Text style={[commonStyles.metricValue, { color: colors.warning }]}>
                    {clients.filter(c => c.status === 'pending').length}
                  </Text>
                  <Text style={commonStyles.metricLabel}>Pending</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Clients List */}
          <View style={commonStyles.section}>
            <Text style={commonStyles.sectionTitle}>All Clients</Text>
            {filteredClients.length > 0 ? (
              filteredClients.map(renderClient)
            ) : (
              <View style={styles.emptyState}>
                <IconSymbol name="person.2" color={colors.textSecondary} size={48} />
                <Text style={[commonStyles.text, { marginTop: 16, textAlign: 'center' }]}>
                  No clients found
                </Text>
                <Text style={[commonStyles.textSecondary, { textAlign: 'center', marginTop: 8 }]}>
                  {searchQuery ? 'Try adjusting your search' : 'Add your first client to get started'}
                </Text>
              </View>
            )}
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
  searchContainer: {
    paddingTop: 16,
    paddingBottom: 8,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.backgroundAlt,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: colors.text,
  },
  clientHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  clientInfo: {
    flex: 1,
  },
  clientName: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: 'white',
  },
  clientDetails: {
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  metricDivider: {
    width: 1,
    height: 40,
    backgroundColor: colors.border,
    marginHorizontal: 16,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 48,
  },
});
