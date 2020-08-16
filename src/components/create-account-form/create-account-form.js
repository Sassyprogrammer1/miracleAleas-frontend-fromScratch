import React, { useState, useRef, useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Form, {
  Item,
  Label,
  ButtonItem,
  ButtonOptions,
  RequiredRule,
  CustomRule,
  EmailRule
} from 'devextreme-react/form';
import LoadIndicator from 'devextreme-react/load-indicator';
import { useAuth } from '../../contexts/auth';
import './create-account-form.scss';
import { DropDownBox } from 'devextreme-react/drop-down-box';
import { List } from 'devextreme-react/list';

export default function (props) {

  const { signUp } = useAuth();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const formData = useRef({});

  
  
  // const onCreateAccountClick = useCallback(() => {
  //   history.push('/create-account');
  // }, [history]);




  const onSubmit = useCallback(async (e) => {
    e.preventDefault();
    const { email, password, confirmPassword} = formData.current;
    setLoading(true);

    await signUp(email,password,confirmPassword);
  }, [signUp]);

  // const confirmPassword = useCallback(
  //   ({ value }) => value = confirmPassword,
  //   []
  // );

  return (
    <form className={'create-account-form'} onSubmit={onSubmit}>
      <Form formData={formData.current} disabled={loading}>
        <Item
          dataField={'email'}
          editorType={'dxTextBox'}
          editorOptions={emailEditorOptions}
        >
          <RequiredRule message="Email is required" />
          <EmailRule message="Email is invalid" />
          <Label visible={false} />
        </Item>
        <Item
          dataField={'password'}
          editorType={'dxTextBox'}
          editorOptions={passwordEditorOptions}
        >
          <RequiredRule message="Password is required" />
          <Label visible={false} />
        </Item>
        <Item
          dataField={'confirmPassword'}
          editorType={'dxTextBox'}
          editorOptions={confirmedPasswordEditorOptions}
        >
          
          <Label visible={false} />
        </Item>
        <Item>
        <DropDownBox
                >
                <List
                   
                />
            </DropDownBox>
        </Item>
        <Item>
          <div className='policy-info'>
            By creating an account, you agree to the <Link>Terms of Service</Link> and <Link>Privacy Policy</Link>
          </div>
        </Item>
        <ButtonItem>
          <ButtonOptions
            width={'100%'}
            type={'default'}
            useSubmitBehavior={true}
          >
            <span className="dx-button-text">
              {
                loading
                  ? <LoadIndicator width={'24px'} height={'24px'} visible={true} />
                  : 'Create a new account'
              }
            </span>
          </ButtonOptions>
        </ButtonItem>
        <Item>
          <div className={'login-link'}>
            Have an account? <Link to={'/login'}>Sign In</Link>
          </div>
        </Item>
      </Form>
    </form>
  );
}

const emailEditorOptions = { stylingMode: 'filled', placeholder: 'Email', mode: 'email' };
const passwordEditorOptions = { stylingMode: 'filled', placeholder: 'Password', mode: 'password' };
const confirmedPasswordEditorOptions = { stylingMode: 'filled', placeholder: 'Confirm Password', mode: 'password' };
