import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { LoginScreenNavigationProp } from '../../types/navigation';

const { width, height } = Dimensions.get('window');

type SocialProvider = '카카오톡' | '네이버' | '구글';

interface LoginFormData {
  email: string;
  password: string;
  autoLogin: boolean;
}

const LoginScreen: React.FC = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [autoLogin, setAutoLogin] = useState<boolean>(false);

  const handleLogin = (): void => {
    const loginData: LoginFormData = { email, password, autoLogin };
    console.log('로그인 시도:', loginData);
    navigation.navigate('Main');
    // 로그인 로직 구현
  };

  const handleSocialLogin = (provider: SocialProvider): void => {
    console.log(`${provider} 로그인 시도`);
    // 소셜 로그인 로직 구현
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* QPIN 로고 */}
      <View style={styles.logoContainer}>
        <LinearGradient
          colors={['#87CEEB', '#20B2AA']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.logoGradient}
        >
          <Text style={styles.logoText}>QPIN</Text>
        </LinearGradient>
      </View>

      {/* 입력 폼 */}
      <View style={styles.formContainer}>
        {/* 이메일 입력 */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="아이디(이메일)"
            placeholderTextColor="#999"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        {/* 비밀번호 입력 */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="비밀번호"
            placeholderTextColor="#999"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <TouchableOpacity style={styles.eyeIcon}>
            <Text style={styles.eyeIconText}>👁</Text>
          </TouchableOpacity>
        </View>

        {/* 자동 로그인 체크박스 */}
        <View style={styles.checkboxContainer}>
          <TouchableOpacity
            style={[styles.checkbox, autoLogin && styles.checkboxChecked]}
            onPress={() => setAutoLogin(!autoLogin)}
          >
            {autoLogin && <Text style={styles.checkmark}>✓</Text>}
          </TouchableOpacity>
          <Text style={styles.checkboxLabel}>자동 로그인</Text>
        </View>

        {/* 로그인 버튼 */}
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <LinearGradient
            colors={['#87CEEB', '#20B2AA']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.loginButtonGradient}
          >
            <Text style={styles.loginButtonText}>로그인</Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* 링크들 */}
        <View style={styles.linksContainer}>
          <TouchableOpacity>
            <Text style={styles.linkText}>아이디 찾기</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.linkText}>비밀번호 찾기</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.linkText}>회원가입</Text>
          </TouchableOpacity>
        </View>

        {/* 간편 로그인 */}
        <View style={styles.socialLoginContainer}>
          <Text style={styles.socialLoginTitle}>간편 로그인</Text>
          
          <View style={styles.socialButtonsContainer}>
            {/* 카카오톡 */}
            <TouchableOpacity
              style={[styles.socialButton, styles.kakaoButton]}
              onPress={() => handleSocialLogin('카카오톡')}
            >
              <View style={styles.socialIconContainer}>
                <Text style={styles.socialIcon}>💬</Text>
              </View>
            </TouchableOpacity>

            {/* 네이버 */}
            <TouchableOpacity
              style={[styles.socialButton, styles.naverButton]}
              onPress={() => handleSocialLogin('네이버')}
            >
              <View style={styles.socialIconContainer}>
                <Text style={styles.socialIconNaver}>N</Text>
              </View>
            </TouchableOpacity>

            {/* 구글 */}
            <TouchableOpacity
              style={[styles.socialButton, styles.googleButton]}
              onPress={() => handleSocialLogin('구글')}
            >
              <View style={styles.socialIconContainer}>
                <Text style={styles.socialIcon}>G</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: height * 0.1,
    marginBottom: height * 0.08,
  },
  logoGradient: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  logoText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#ffffff',
    letterSpacing: 2,
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 30,
  },
  inputContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    paddingVertical: 15,
    paddingRight: 40,
    fontSize: 16,
    color: '#333',
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
    top: 15,
    padding: 5,
  },
  eyeIconText: {
    fontSize: 18,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 3,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#87CEEB',
    borderColor: '#87CEEB',
  },
  checkmark: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  checkboxLabel: {
    fontSize: 14,
    color: '#666',
  },
  loginButton: {
    marginBottom: 30,
    borderRadius: 25,
    overflow: 'hidden',
  },
  loginButtonGradient: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  linksContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 50,
  },
  linkText: {
    fontSize: 14,
    color: '#666',
  },
  socialLoginContainer: {
    alignItems: 'center',
  },
  socialLoginTitle: {
    fontSize: 14,
    color: '#999',
    marginBottom: 20,
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
  },
  socialButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  kakaoButton: {
    backgroundColor: '#FEE500',
  },
  naverButton: {
    backgroundColor: '#03C75A',
  },
  googleButton: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  socialIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialIcon: {
    fontSize: 20,
  },
  socialIconNaver: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});

export default LoginScreen;