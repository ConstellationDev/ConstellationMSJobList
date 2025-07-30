import { useEffect, useMemo, useState } from 'react';
import { SafeAreaView, FlatList, Text, View, StyleSheet, ListRenderItem, ActivityIndicator, TextInput } from 'react-native';
import GetAllNominations from './services/ApiServices';

type JobItem = {
  id?: string;
  jobID: string;
  vessel: string;
  location: string;
  jobscope: string;
  remarks: string;
  surveyor: string;
  guardian: string;
  client: string;
  created_at: string;
};

const DATA: JobItem[] = [];

const Item = (item: JobItem) => (
  <View style={styles.item}>
    <Text style={styles.title}>Ref No.: {item.jobID}</Text>
    <Text style={styles.title}>Vessel name: {item.vessel}</Text>
    <Text style={styles.title}>Location: {item.location}</Text>
    <Text style={styles.title}>Scope: {item.job_scopes[0].name}</Text>
    {item.remarks && <Text style={styles.title}>Remarks: {item.remarks}</Text>}
    <Text style={styles.title}>Surveyor: {item.surveyors[0]?.firstname} {item.surveyors[0]?.lastname}</Text>
    <Text style={styles.title}>GA: {item.guardians[0]?.firstname} {item.guardians[0]?.lastname}</Text>
    <Text style={styles.title}>Client: {item.appointmentable.companyname}</Text>
    <Text style={styles.title}>Date Posted: {item.created_at.substring(0, 10)}</Text>
  </View>
);

export default function HomeScreen() {

  const [isLoading, setIsLoading] = useState(true);

  const [myJobs, setMyJobs] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredJobs, setFilteredJobs] = useState([]);

  const renderItem: ListRenderItem<JobItem> = ({ item }) => <Item {...item} />;

  const getJobsV2 = async () => {
    await GetAllNominations()
      .then((data) => {
        setMyJobs(data);
      }).finally(() => {
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching jobs:', error);
      });
  };

  useEffect(() => {
    getJobsV2();
  }, []);

  const memoizedRenderdItem = useMemo(() => renderItem, [myJobs]);

  return (

    <SafeAreaView style={{
      flex: 1
    }}>
      {isLoading ?
        <>
          <ActivityIndicator size='large' color='#376388' />
          <Text style={{
            textAlign: 'center',
            alignContent: 'center'
          }}>
            Checking for your jobs, please wait...
          </Text>
        </>
        :
        <>
          <TextInput
            style={styles.inputs}
            autoCapitalize='none'
            autoCorrect={false}
            placeholder='Search Vessel / Client / Reference No....'
            placeholderTextColor='#ccc'
            onChangeText={(text) => {
              setSearch(text);

              let searched = myJobs.filter((item) => {
                //search 
                return item?.vessel.toString().toLowerCase().includes(text.toLocaleLowerCase()) || item?.appointmentable.companyname.toString().toLowerCase().includes(text.toLocaleLowerCase()) || item?.jobID.toString().toLowerCase().includes(text.toLocaleLowerCase())
              })

              setFilteredJobs(searched);
            }}
          />

          <FlatList
            data={search === '' ? myJobs : filteredJobs}
            renderItem={memoizedRenderdItem}
            keyExtractor={(item, index) => item.id ?? item.jobID ?? index.toString()}
            contentContainerStyle={{ paddingBottom: 16 }}
            ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 20 }}>No jobs found.</Text>}
            initialNumToRender={10}
            maxToRenderPerBatch={10}
            windowSize={5}
            removeClippedSubviews={true}
            showsVerticalScrollIndicator={false}
          />
        </>
      }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#eee',
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderStyle: 'solid',
    borderColor: '#000',
    borderWidth: 2,
    borderRadius: 10,
  },
  title: {
    fontSize: 16,
  },
  inputs: {
    borderWidth: 2,
    borderRadius: 10,
    paddingLeft: 10,
    margin: 16,
    fontSize: 17,
    fontWeight: '500',
    paddingVertical: 0,
    height: 45,
    color: '#000',
  },
});
