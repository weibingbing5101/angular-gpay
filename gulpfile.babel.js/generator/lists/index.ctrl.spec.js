import <%= upCaseAppname %>Module from './<%= appname %>'
import <%= upCaseAppname %>Controller from './<%= appname %>.ctrl';
import <%= upCaseAppname %>Component from './<%= appname %>.comp';
import <%= upCaseAppname %>Template from './<%= appname %>.html';

describe('<%= upCaseAppname %>', () => {
  let $rootScope, makeController;

  beforeEach(window.module(<%= upCaseAppname %>Module.name));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new <%= upCaseAppname %>Controller();
    };
  }));

  describe('Module', () => {
    // top-level specs: i.e., routes, injection, naming
  });

  describe('Controller', () => {
    // controller specs
    it('has a name property [REMOVE]', () => { // erase if removing this.name from the controller
      let controller = makeController();
      expect(controller).to.have.property('name');
    });
  });

  describe('Template', () => {
    // template specs
    // tip: use regex to ensure correct bindings are used e.g., {{  }}
    it('has name in template [REMOVE]', () => {
      expect(<%= upCaseAppname %>Template).to.match(/{{\s?vm\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = <%= upCaseAppname %>Component;

      it('includes the intended template',() => {
        expect(component.template).to.equal(<%= upCaseAppname %>Template);
      });

      it('uses `controllerAs` syntax', () => {
        expect(component).to.have.property('controllerAs');
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(<%= upCaseAppname %>Controller);
      });
  });
});
