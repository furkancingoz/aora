import { ScrollView, View, Text, Image, Alert } from 'react-native'
import React,  { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link, router } from 'expo-router';
import  GlobalProvider from '../../context/GlobalProvider';
import { images } from '../../constants';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import { getCurrentUser, signIn } from '../../lib/appwrite';
import { useGlobalContext } from '../../context/GlobalProvider';

const SignIn = () => {
  const { setUser, setIsLoggedIn } = useGlobalContext();
  const [form, setForm] = useState({
    email: '',
    password: ''
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)

  const submit = async () => {
    if(!form.email || !form.password){
      Alert.alert('Error', 'Please fill in all the fields')
      return
    }
     setIsSubmitting(true);
     try{
      await signIn(form.email, form.password);

      const result = await getCurrentUser();
      setUser(result);
      setIsLoggedIn(true)

      router.replace('/home')
     } catch (error) {
      Alert.alert('Error', error.message, "burası")
     } finally {
      setIsSubmitting(false) 
     }

  }
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full flex justify-center min-h-[60vh] px-4">
          <Image source={images.logo} resizeMode='contain' className="w-[115px] h-[35px]" />
          <Text className="text-2xl text-white text-semibold mt-10 font-psemibold">Login in to Aora</Text>
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-adress"
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(p) => setForm({ ...form, password: p })}
            otherStyles="mt-7"
          />
        </View>
        <CustomButton 
          title="Sign In"
          handlePress={submit}
          containerStyles="mt-0"
          isLoading={isSubmitting}
          />
          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Dont't have a account?
            </Text>
            <Link href="/sign-up" className="text-lg font-psemibold text-secondary">
            Sign Up
            </Link>
          </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn